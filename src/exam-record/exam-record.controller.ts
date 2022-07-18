import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ExamRecordService } from './exam-record.service';
import { ExamRecordDto } from './dto/create-exam-record.dto';
import { ResultData } from '@/common/utils/result';
import { User } from '@/common/module/user/decorator/user.decorator';

@Controller('exam-record')
export class ExamRecordController {
  constructor(private readonly examRecordService: ExamRecordService) {}

  @Post()
  create(@Body() createExamRecordDto: ExamRecordDto, @User('id') userId) {
    return this.examRecordService.create(createExamRecordDto, userId);
  }

  @Get()
  async findAll() {
    const result = await this.examRecordService.findAll();
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
