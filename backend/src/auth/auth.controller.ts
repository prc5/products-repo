import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
