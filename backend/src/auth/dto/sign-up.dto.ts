import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  surname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
