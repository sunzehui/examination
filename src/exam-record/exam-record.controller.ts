import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ExamRecordService } from './exam-record.service';
import { ExamRecordDto } from './dto/create-exam-record.dto';
import { ResultData } from '@/common/utils/result';
import { User } from '@/common/module/user/decorator/user.decorator';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { BanRepeatGuard } from '@/exam-clock/guards/ban-repeat.guard';
import { ExamineesPaperDto } from '@/exam-paper/dto/examinees-paper.dto';

@Controller('exam-record')
export class ExamRecordController {
  constructor(private readonly examRecordService: ExamRecordService) {}

  @Post('enter')
  @UseGuards(BanRepeatGuard)
  @Auth(Role.student)
  @HttpCode(200)
  async interExamRoom(
    @User('id') userId: string,
    @Query('room_id') exam_room_id: string,
    @Query('paper_id') exam_paper_id: string,
  ) {
    const result = await this.examRecordService.enterExamRoom(
      {
        exam_room_id: +exam_room_id,
        exam_paper_id: +exam_paper_id,
      },
      userId,
    );
    return ResultData.ok(result);
  }
  @Post()
  create(@Body() createExamRecordDto: ExamRecordDto, @User('id') userId) {
    return this.examRecordService.create(createExamRecordDto, userId);
  }

  @Get()
  @Auth(Role.student, Role.teacher)
  async findAll(@User('id') userId) {
    const result = await this.examRecordService.findAll(userId);
    return ResultData.ok(result);
  }

  @Get('statistic')
  @Auth(Role.student, Role.teacher)
  async statistic(@User('id') userId, @Query('roomId') roomId) {
    const result = await this.examRecordService.statisticScore(userId, roomId);
    return ResultData.ok(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.examRecordService.findOne(+id);
    return ResultData.ok(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examRecordService.remove(+id);
  }
}
