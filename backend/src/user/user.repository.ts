import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { SignInDto } from '../auth/dto/sign-in.dto';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(user: User): Promise<User> {
    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Login already used');
      }
      throw new InternalServerErrorException();
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { login, password, name, surname } = signUpDto;

    const user = new User();
    user.login = login;
    user.name = name;
    user.surname = surname;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    await this.saveUser(user);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { login, name, surname } = updateUserDto;

    const user = await this.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    user.login = login;
    user.name = name;
    user.surname = surname;

    return await this.saveUser(user);
  }

  async changeUserPassword(
    userLogin: string,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = changeUserPasswordDto;

    const user = await this.getAuthorizedUser(userLogin, currentPassword);

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(newPassword, user.salt);

    await user.save();
  }

  async validateUserPassword(signInDto: SignInDto): Promise<string> {
    const { login, password } = signInDto;
    const user = await this.getAuthorizedUser(login, password);

    if (user) {
      return user.login;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getAuthorizedUser(login: string, password: string) {
    const user = await this.createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.salt')
      .where('user.login = :login', { login })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isAuthorized = await user.validatePassword(
      password,
      user.password,
      user.salt,
    );

    if (!isAuthorized) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
