import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { User } from '@/common/module/user/entities/user.entity';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';

@Entity()
@Index(["user", "exam_room"], { unique: true })
export class ExamRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_time: string;

  @Column({ type: 'datetime', default: null })
  submit_time: string;

  @ManyToOne(() => ExamPaper)
  @JoinColumn()
  exam_paper: ExamPaper;

  @Column({ type: 'json' })
  answer: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => ExamRoom)
  @JoinColumn()
  exam_room: ExamRoom;
}
