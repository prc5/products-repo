import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getMyProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userRepository.updateUser(userId, updateUserDto);
  }

  async changeUserPassword(
    userLogin: string,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ): Promise<void> {
    return this.userRepository.changeUserPassword(
      userLogin,
      changeUserPasswordDto,
    );
  }
}
