import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: number) {
    // using queryBuilder doesnt return the Tasks even if { eager: true }
    const query = this.userRepository.createQueryBuilder('user');
    query.where('user.id = :id', { id });
    return query.getMany();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {

    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = password;


    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    // WITH 'jsonwebtoken'
    //const token = jwt.sign({ username }, jwtConstants.secret, {expiresIn: '1h'});

    // WITH @Nest/jwt
    const token = this.jwtService.sign({ username });

    return { token };

  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
