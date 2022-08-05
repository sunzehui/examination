import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegisterResult } from 'types/user';
import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { JwtAuthGuard } from '@/common/module/auth/guards/jwt-auth.guard';
import { User } from '@/common/module/auth/decorator/Req.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
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

  @Patch('type')
  @UseGuards(JwtAuthGuard)
  async setUserType(@User() { id }, @Query('to_type') toType) {
    const result = await this.userService.setUserType(+id, toType);
    return ResultData.ok(result);
  }

  @Get('me')
  @Auth(Role.teacher, Role.student)
  async userProfile(@User('id') userId: number) {
    const result = await this.userService.getUserProfile(userId);
    return ResultData.ok(result);
  }

  @Patch('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @Auth(Role.teacher, Role.student)
  async setAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User('id') userId,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    const result = await this.userService.setUserAvatar(
      userId,
      file,
      uploadFileDto,
    );
    return ResultData.ok(result);
  }
}
