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
import { ApiProperty } from '@nestjs/swagger';

@Entity('classes')
export class Classes {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: '班级名称',
  })
  @Column({ default: '未命名班级' })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: number;

  @ApiProperty({
    type: String,
    description: '老师',
  })
  @ManyToOne(() => User, (user) => user.created_class)
  created_by: User;

  @ApiProperty({
    type: [User],
    description: '班级所有学生/老师',
  })
  @ManyToMany(() => User, (user) => user.join_class, {})
  @JoinTable({
    name: 'user_classes',
  })
  users: User[];

  @ApiProperty({
    type: [ExamRoom],
    description: '关联考试',
  })
  @OneToMany(() => ExamRoom, (e) => e.for_classes)
  has_exam: ExamRoom[];
}
