import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassmateDto } from './dto/update-class.dto';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { User } from '@/common/module/user/decorator/user.decorator';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { ResultData } from '@/common/utils/result';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create')
  @Auth(Role.teacher)
  @HttpCode(200)
  async create(@User() user, @Body() createClassDto: CreateClassDto) {
    const result = await this.classesService.create(createClassDto, user.id);
    return ResultData.ok(result);
  }

  // 查询本班信息
  @Get(':id')
  @Auth(Role.teacher, Role.student)
  async findOne(@Param('id') id: string) {
    const result = await this.classesService.findOne(id);
    return ResultData.ok(result);
  }

  // 查询本班所有学生
  @Get(':id/student')
  @Auth(Role.teacher)
  async findOneStu(@Param('id') id: string) {
    const result = await this.classesService.findStudent(id);
    return ResultData.ok(result);
  }

  // 添加学生
  @Patch(':id')
  @Auth(Role.teacher)
  async addStudent(
    @Param('id') id: string,
    @Body() classmateDto: ClassmateDto[],
  ) {
    const result = await this.classesService.addStudent(id, classmateDto);
    return ResultData.ok(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
