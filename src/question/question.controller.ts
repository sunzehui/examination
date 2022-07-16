import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { ResultData } from '@/common/utils/result';
import { Auth } from '@/common/module/auth/guards/auth.guard';
import { Role } from '@/common/module/auth/decorator/role.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(200)
  @Auth(Role.teacher)
  async create(@Body() createQuestionDto: CreateQuestionDTO[]) {
    const result = await this.questionService.create(createQuestionDto);
    return ResultData.ok(result);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @Auth(Role.teacher, Role.student)
  async findOne(@Param('id') id: string) {
    const result = await this.questionService.findOne(+id);
    return ResultData.ok(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
