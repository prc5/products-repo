import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  currentPassword: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  newPassword: string;
}
