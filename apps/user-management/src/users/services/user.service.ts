import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        this.logger.log('Getting all users');
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User | null> {
        this.logger.log(`Get user id: ${id}`);
        return this.usersRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        this.logger.log(`Removing user id: ${id}`);
        await this.usersRepository.delete(id);
        this.logger.log(`Removed user id: ${id}`);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        user.firstName = createUserDto.firstName.trim();
        user.lastName = createUserDto.lastName.trim();
        user.email = createUserDto.email.trim().toLocaleLowerCase();
        return this.usersRepository.save(user);
    }

    async update(updateUserDto: UpdateUserDto): Promise<User> {
        const id = updateUserDto.id
        const user = await this.usersRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundException(id);
        }

        Object.assign(user, updateUserDto)
        return this.usersRepository.save(user);
    }

    async createMany(createUsersDto: CreateUserDto[]): Promise<User[]> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        const createdUsers: User[] = [];

        try {
            const savePromises = createUsersDto.map(async createUserDto => {
                
                const user = this.usersRepository.create(createUserDto);
                user.firstName = createUserDto.firstName.trim();
                user.lastName = createUserDto.lastName.trim();
                user.email = createUserDto.email.trim().toLocaleLowerCase();
                const savedUser = await queryRunner.manager.save(user);
                createdUsers.push(savedUser);
            });
    
            this.logger.log('Awaiting creations');
            await Promise.all(savePromises);
            this.logger.log('Creations done');
            await queryRunner.commitTransaction();
            this.logger.log('Transaction committed');
            return createdUsers;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
 }
