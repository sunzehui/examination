import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegisterResult } from 'types/user';
import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    return ResultData.ok<UserRegisterResult>(result);
  }

  @Get('hello')
  hello(@Body() createUserDto: CreateUserDto) {
    return 'hello';
  }

  @Get('student')
  @Auth(Role.teacher)
  async allStudent() {
    const result = await this.userService.getAllStudent();
    return ResultData.ok(result);
  }
}
