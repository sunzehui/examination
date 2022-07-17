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
import { UpdateExamPaperDto } from './dto/update-exam-paper.dto';
import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { User } from '@/common/module/user/decorator/user.decorator';

@Controller('exam-paper')
export class ExamPaperController {
  constructor(private readonly examPaperService: ExamPaperService) {}

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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.examPaperService.findOne(+id);
    return ResultData.ok(result);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamPaperDto: UpdateExamPaperDto,
  ) {
    return this.examPaperService.update(+id, updateExamPaperDto);
  }

  @Patch(':id/question')
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
