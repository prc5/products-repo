import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './jwt/jwt-payload.interface';
import { UserRepository } from '../user/user.repository';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const login = await this.userRepository.validateUserPassword(signInDto);
    if (!login) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { login };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
