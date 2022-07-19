import { Test, TestingModule } from '@nestjs/testing';
import { ExamClockService } from './exam-clock.service';

describe('ExamClockService', () => {
  let service: ExamClockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamClockService],
    }).compile();

    service = module.get<ExamClockService>(ExamClockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
