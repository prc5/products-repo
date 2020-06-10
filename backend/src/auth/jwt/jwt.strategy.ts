import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';

import { UserRepository } from '../../user/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PASSPORT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { login } = payload;

    const user = await this.userRepository.findOne({ login });

    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }

    return user;
  }
}
