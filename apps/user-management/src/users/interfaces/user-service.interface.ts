import { CreateUserDto } from "../dtos/requests/create-user.dto";
import { UpdateUserDto } from "../dtos/requests/update-user.dto";
import { User } from "../entities/user.entity";

export interface IUserService {
    findAll(): Promise<User[]>;

    findOne(id: string): Promise<User | null>;

    remove(id: string): Promise<void>

    create(createUserDto: CreateUserDto): Promise<User>

    update(updateUserDto: UpdateUserDto): Promise<User>;

    createMany(createUsersDto: CreateUserDto[]): Promise<User[]>;
}