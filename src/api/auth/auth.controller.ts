import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() userIn: LoginDto) {
    return this.authService.login(userIn);
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 200, description: 'Registration successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  register(@Body() userIn: RegisterDto) {
    return this.authService.register(userIn);
  }

  @Post('/reset-password')
  resetPassword(@Body() body: { token: string, password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }


  @Post('/check-verified')
  checkVerified(@Body() body: { email: string }) {
    return this.authService.checkVerified(body.email);
  }


  @Get('/verify')
  async verifyEmail(@Query('token') token: string) {
    console.log(token)
    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload)
      const user = await this.authService.verifyUserEmail(payload.email, token);
      return { message: 'Email verified successfully', user };
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }
  }


}
