import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegisterResult } from '@/share/types/user';
import { ResultData } from '@/utils/result';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    return ResultData.ok<UserRegisterResult>(result);
  }
  @Get('hello')
  hello(@Body() createUserDto: CreateUserDto) {
    return 'hello';
  }
}
