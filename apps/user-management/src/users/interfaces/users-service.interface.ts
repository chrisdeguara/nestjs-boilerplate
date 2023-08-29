import { CreateUserDto } from "../dtos/requests/create-user.dto";
import { UpdateUserDto } from "../dtos/requests/update-user";
import { User } from "../entities/user.entity";

export interface IUsersService {
    findAll(): Promise<User[]>;

    findOne(id: string): Promise<User | null>;

    remove(id: string): Promise<void>

    create(createUserDto: CreateUserDto): Promise<User>

    update(updateUserDto: UpdateUserDto): Promise<User>;

    createMany(createUsersDto: CreateUserDto[]): Promise<User[]>;
}