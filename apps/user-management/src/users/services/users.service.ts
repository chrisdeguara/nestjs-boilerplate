import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user';
import { IUsersService } from '../interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {

    private readonly logger = new Logger(UsersService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
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
                
                this.logger.log(`Creating user: ${createUserDto}`);
                const user = this.usersRepository.create(createUserDto);
                user.firstName = createUserDto.firstName.trim();
                user.lastName = createUserDto.lastName.trim();
                user.email = createUserDto.email.trim().toLocaleLowerCase();
                const savedUser = await queryRunner.manager.save(user);
                createdUsers.push(savedUser);
                this.logger.log(`Created user: ${createUserDto}`);
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
