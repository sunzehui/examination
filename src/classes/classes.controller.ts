import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassmateDto } from './dto/update-class.dto';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { User } from '@/common/module/user/decorator/user.decorator';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { ResultData } from '@/common/utils/result';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Classes } from '@/classes/entities/classes.entity';

@ApiBearerAuth()
@ApiTags('班级管理')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create')
  @Auth(Role.teacher)
  @ApiBody({
    type: CreateClassDto,
  })
  @ApiResponse({
    status: 200,
    description: '创建班级',
    type: ResultData<Classes>,
  })
  @HttpCode(200)
  async create(@User() user, @Body() createClassDto: CreateClassDto) {
    const result = await this.classesService.create(createClassDto, user.id);
    return ResultData.ok(result);
  }

  // 查询本班信息
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: '查询本班信息',
    type: ResultData<Classes>,
  })
  @Auth(Role.teacher, Role.student)
  async findOne(@Param('id') id: string) {
    const result = await this.classesService.findOne(id);
    return ResultData.ok(result);
  }

  // 查询所有班级信息
  @Get()
  @ApiResponse({
    status: 200,
    description: '查询所有班级信息',
    type: ResultData<[Classes]>,
  })
  @Auth(Role.teacher, Role.student)
  async find() {
    const result = await this.classesService.find();
    return ResultData.ok(result);
  }

  // 查询本班所有学生
  @Get(':id/student')
  @ApiResponse({
    status: 200,
    description: '查询本班信息',
    type: ResultData<Classes>,
  })
  @ApiParam({
    type: String,
    name: '班级编号',
  })
  @Auth(Role.teacher, Role.student)
  async findOneStu(@Param('id') id: string) {
    const result = await this.classesService.findStudent(+id);
    return ResultData.ok(result);
  }

  // 添加学生
  @Patch(':id')
  @Auth(Role.teacher)
  @ApiBody({
    type: [ClassmateDto],
    description: '学生信息',
  })
  @ApiParam({
    type: String,
    name: '班级编号',
  })
  @ApiResponse({
    status: 200,
    description: '查询本班信息',
    type: ResultData<Classes>,
  })
  async addStudent(
    @Param('id') id: string,
    @Body() classmateDto: ClassmateDto[],
  ) {
    const result = await this.classesService.addStudent(+id, classmateDto);
    return ResultData.ok(result);
  }

  // 加入班级
  @Post('join/:id')
  @Auth(Role.student)
  @ApiBody({
    type: [ClassmateDto],
    description: '学生信息',
  })
  @ApiParam({
    type: String,
    name: '班级编号',
  })
  @ApiResponse({
    status: 200,
    description: '查询本班信息',
    type: ResultData<Classes>,
  })
  async joinCLass(@Param('id') id: string, @User('id') userId: string) {
    const result = await this.classesService.joinClass(+id, userId);
    return ResultData.ok(result);
  }
}
