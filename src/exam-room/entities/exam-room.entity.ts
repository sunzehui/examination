import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { User } from '@/common/module/user/entities/user.entity';
import { Classes } from '@/classes/entities/classes.entity';

export enum ExamStatus {
  // 等待开始
  wait,
  // 正在考试
  on,
  // 考试结束
  off,
}

@Entity('exam_room')
export class ExamRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '未命名考场' })
  name: string;

  @OneToOne(() => ExamPaper, (ep) => ep.bind_exam_room)
  @JoinColumn()
  use_exam_paper: ExamPaper;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  create_time: string;

  @ManyToOne(() => User, (user) => user.created_exam_room)
  created_by: User;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  begin_time: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  end_time: string;

  @ManyToOne(() => Classes, (c) => c.has_exam)
  @JoinColumn()
  for_classes: Classes;
}
