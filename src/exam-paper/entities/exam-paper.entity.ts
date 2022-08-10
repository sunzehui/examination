import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/common/module/user/entities/user.entity';
import { Question } from '@/question/entities/question.entity';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';

@Entity()
export class ExamPaper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '试卷' })
  desc: string;
  @Column({ default: '试卷' })
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_time: number;

  @Column({ type: 'int', default: () => 0 })
  total_score: number;

  @ManyToOne(() => User, (user) => user.created_exam_paper)
  created_by: User;

  @ManyToMany(() => Question, (q) => q.in_exam_paper)
  @JoinTable({
    name: 'question_exam_paper',
    joinColumn: {
      name: 'exam_paper',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'question',
      referencedColumnName: 'id',
    },
  })
  has_Q: Question[];

  @OneToMany(() => ExamRoom, (er) => er.use_exam_paper)
  bind_exam_room: ExamRoom[];
}
