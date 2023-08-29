import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/requests/update-user';
import { USERS_SERVICE } from '../constants/constants';
import { IUsersService } from '../interfaces/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDtos: CreateUserDto[]): Promise<User[]> {
    try {
        return await this.usersService.createMany(createUserDtos);
    } catch (error) {
        throw new BadRequestException(error.message)
    }
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
        return await this.usersService.update(updateUserDto);
    } catch (error) {
        throw new BadRequestException(error.message)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}