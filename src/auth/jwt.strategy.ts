import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.constants';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

// Like middleware, easy get and verify Token with Passport
// Usage @UseGuards(AuthGuard())
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.secret,
      },
    );
  }

  // Validate method is called if token is verified successfully and pass the payload
  async validate(payload: { username: string }) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    return user;
  }
}


