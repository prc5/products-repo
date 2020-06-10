import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
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
}
