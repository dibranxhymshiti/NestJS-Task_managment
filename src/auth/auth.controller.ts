import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Get('/user/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUser(id);
  }

  @Post('/signin')
  singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Delete('user/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.authService.deleteById(id);
  }

}
