import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  public readonly id: string;

  @IsNotEmpty()
  public readonly firstName: string;

  @IsNotEmpty()
  public readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;
    
}