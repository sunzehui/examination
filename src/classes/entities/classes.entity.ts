import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/common/module/user/entities/user.entity';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';

@Entity('classes')
export class Classes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '未命名班级' })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: number;

  @ManyToOne(() => User, (user) => user.created_class)
  created_by: User;

  @ManyToMany(() => User, (user) => user.join_class, {})
  @JoinTable({
    name: 'user_classes',
  })
  users: User[];

  @OneToMany(() => ExamRoom, (e) => e.for_classes)
  has_exam: ExamRoom[];
}
