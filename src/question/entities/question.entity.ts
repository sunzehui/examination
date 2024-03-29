import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 255, default: '暂无解析' })
  resolution: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  q_type: number;

  @OneToMany(() => ChoiceQ, (c) => c.question)
  choice: Relation<ChoiceQ>[];
  @OneToMany(() => FillBlankQ, (f) => f.question)
  fill_blank: Relation<FillBlankQ>[];

  @ManyToMany(() => ExamPaper, (e) => e.has_Q)
  in_exam_paper: ExamPaper[];
  @Column({ type: 'int', default: 2 })
  score: number;
}

@Entity('choice')
export class ChoiceQ {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (q) => q.choice)
  question: Question;

  @Column({ type: 'varchar', length: 255, default: '' })
  content: string;

  @Column({ type: 'boolean', default: false, select: false })
  is_answer: boolean;
}

@Entity('fill_blank')
export class FillBlankQ {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (f) => f.fill_blank)
  question: Question;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  pos: string;

  @Column({ type: 'varchar', nullable: false, length: 255, select: false })
  content: string;

  @Column({ type: 'int', nullable: false, default: 2 })
  score: number;
}
