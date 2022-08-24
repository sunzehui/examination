import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';
import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(200)
  @Auth(Role.teacher)
  async create(@Body() createQuestionDto: QuestionDto[]) {
    const result = await this.questionService.create(createQuestionDto);
    return ResultData.ok(result);
  }

  @Get(':id')
  @Auth(Role.teacher, Role.student)
  async findOne(@Param('id') id: string) {
    const result = await this.questionService.findOne(+id);
    return ResultData.ok(result);
  }
}
