import { Controller, UseGuards, Put, Body, Patch, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  getMyProfile(@GetUser() user: User): Promise<User> {
    return this.UserService.getMyProfile(user.id);
  }

  @Put()
  updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.UserService.updateUser(user.id, updateUserDto);
  }

  @Patch()
  changeUserPassword(
    @GetUser() user: User,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ): Promise<void> {
    return this.UserService.changeUserPassword(
      user.login,
      changeUserPasswordDto,
    );
  }
}
