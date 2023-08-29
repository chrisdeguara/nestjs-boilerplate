import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    public readonly firstName: string;

    @IsNotEmpty()
    public readonly lastName: string;

    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

  }