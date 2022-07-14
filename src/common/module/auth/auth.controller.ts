import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserStatusDTO } from '../user/dto/user-status.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

import { Controller, Get, Post, UseGuards, HttpCode } from '@nestjs/common';
import { User } from './decorator/Req.decorator';
import { ResultData } from '@/common/utils/result';
import { UserLoginResult } from 'types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserStatusDTO) {
    const result = await this.authService.login(user);
    return ResultData.ok<UserLoginResult>(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  me(@User() user: UserStatusDTO) {
    return user;
  }
}
