import { Injectable } from '@nestjs/common';
import { CreateExamPaperDto } from './dto/create-exam-paper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { Repository } from 'typeorm';
import { Question } from '@/question/entities/question.entity';
import { QuestionService } from '@/question/question.service';
import { ExamineesPaperDto } from '@/exam-paper/dto/examinees-paper.dto';

@Injectable()
export class ExamPaperService {
  constructor(
    @InjectRepository(ExamPaper)
    private readonly repo: Repository<ExamPaper>,
    private readonly questionService: QuestionService,
  ) {}

  create(createExamPaperDto: CreateExamPaperDto, userId) {
    const examPaperEntity = this.repo.create({
      name: createExamPaperDto.name,
      created_by: { id: userId },
    });
    return this.repo.save(examPaperEntity);
  }

  findAll(where) {
    return this.repo.find({
      where,
    });
  }

  //查询时关联所有问题
  async findOne(id: number, showAnswer = false) {
    const paperEntity = await this.repo.findOne({
      where: { id },
      relations: ['has_Q'],
    });
    const ids = paperEntity.has_Q.map((q) => q.id);
    const allQEntities = await this.questionService.findIn(ids, showAnswer);

    return {
      id: paperEntity.id,
      name: paperEntity.name,
      question: allQEntities,
    };
  }

  update(id: number) {
    return `This action updates a #${id} examPaper`;
  }

  async settlement(id: number, examineesPaperDto: ExamineesPaperDto[]) {
    //  get all q_id 's answer
    const examPaperEntity = await this.findOne(id, true);
    //  put in questionService(answer, dto)
    return await this.questionService.checkQuestionAnswer(
      examPaperEntity.question,
      examineesPaperDto,
    );
  }

  async addQuestion(eId: number, qId: number) {
    const examPaperEntity = await this.repo.findOne({
      where: { id: eId },
      relations: ['has_Q'],
    });
    const qEntity = new Question();
    examPaperEntity.id = eId;
    qEntity.id = qId;
    examPaperEntity.has_Q.push(qEntity);
    return this.repo.save(examPaperEntity);
  }

  remove(id: number) {
    return `This action removes a #${id} examPaper`;
  }
}
