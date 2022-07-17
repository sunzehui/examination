import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { User } from '@/common/module/user/decorator/user.decorator';
import { ExamRoomService } from '@/exam-room/exam-room.service';
import { CreateExamRoomDto } from '@/exam-room/dto/create-exam-room.dto';

@Controller('exam-room')
export class ExamRoomController {
  constructor(private readonly examRoomService: ExamRoomService) {}

  // 创建考场
  @Post()
  @HttpCode(200)
  @Auth(Role.teacher)
  async create(@Body() createExamRoomDto: CreateExamRoomDto, @User() user) {
    const result = await this.examRoomService.create(
      createExamRoomDto,
      user.id,
    );
    return ResultData.ok(result);
  }

  @Get()
  @Auth(Role.teacher, Role.student)
  async findAll(@Query() query, @User() user) {
    const result = await this.examRoomService.findAll(query, user.id);
    return ResultData.ok(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.examRoomService.findOne(+id);
    return ResultData.ok(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examRoomService.remove(+id);
  }
}
