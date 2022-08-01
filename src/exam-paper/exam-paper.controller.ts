import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExamPaperService } from './exam-paper.service';
import { CreateExamPaperDto } from './dto/create-exam-paper.dto';
import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { User } from '@/common/module/user/decorator/user.decorator';
import { ExamineesPaperDto } from '@/exam-paper/dto/examinees-paper.dto';
import { ExamRecordService } from '@/exam-record/exam-record.service';

@Controller('exam-paper')
export class ExamPaperController {
  constructor(
    private readonly examPaperService: ExamPaperService,
    private readonly examRecordService: ExamRecordService,
  ) {}

  @Post()
  @HttpCode(200)
  @Auth(Role.teacher)
  async create(@Body() createExamPaperDto: CreateExamPaperDto, @User() user) {
    const result = await this.examPaperService.create(
      createExamPaperDto,
      user.id,
    );
    return ResultData.ok(result);
  }

  @Get()
  @Auth(Role.teacher, Role.student)
  async findAll(@Query() query) {
    const result = await this.examPaperService.findAll(query);
    return ResultData.ok(result);
  }

  @Get('mine')
  @Auth(Role.teacher)
  async findMine(@User('id') userId) {
    const result = await this.examPaperService.findMine(userId);
    return ResultData.ok(result);
  }

  @Get(':id')
  @Auth(Role.student, Role.teacher)
  async findOne(@Param('id') id: string, @User('role') role) {
    let showAnswer = role === Role.teacher;
    const result = await this.examPaperService.findOne(+id, showAnswer);
    return ResultData.ok(result);
  }

  @Post(':id/submit')
  @Auth(Role.student)
  @HttpCode(200)
  async settlement(
    @Param('id') id: string,
    @User('id') userId: string,
    @Query('room_id') exam_room_id: string,
    @Body() examineesPaperDto: ExamineesPaperDto[],
  ) {
    const result = await this.examPaperService.settlement(
      +id,
      examineesPaperDto,
    );
    await this.examRecordService.create(
      {
        exam_paper_id: +id,
        answer: JSON.stringify(examineesPaperDto),
        exam_room_id: +exam_room_id,
      },
      userId,
    );
    return ResultData.ok(result);
  }

  @Patch(':id/question/remove')
  @Auth(Role.teacher)
  async removeQuestion(@Param('id') id: string, @Query('q_id') qId: string) {
    const result = await this.examPaperService.removeQuestion(+id, +qId);
    return ResultData.ok(result);
  }

  @Patch(':id/question/add')
  @Auth(Role.teacher)
  async addQuestion(@Param('id') id: string, @Query('q_id') qId: string) {
    const result = await this.examPaperService.addQuestion(+id, +qId);
    return ResultData.ok(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examPaperService.remove(+id);
  }
}
