import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
