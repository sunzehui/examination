import { Test, TestingModule } from '@nestjs/testing';
import { ExamClockGateway } from './exam-clock.gateway';
import { ExamClockService } from './exam-clock.service';

describe('ExamClockGateway', () => {
  let gateway: ExamClockGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamClockGateway, ExamClockService],
    }).compile();

    gateway = module.get<ExamClockGateway>(ExamClockGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
