import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The user login.',
    type: LoginResponseDto,
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
