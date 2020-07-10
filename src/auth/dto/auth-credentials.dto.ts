import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  username: string;


  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
