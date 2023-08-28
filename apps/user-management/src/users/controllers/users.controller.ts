import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/requests/update-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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