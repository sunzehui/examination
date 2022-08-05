import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '@/common/module/auth/decorator/role.decorator';
import { Classes } from '@/classes/entities/classes.entity';
import { ExamPaper } from '@/exam-paper/entities/exam-paper.entity';
import { ExamRoom } from '@/exam-room/entities/exam-room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: '大侠' })
  nickname: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: number;

  @Column({
    type: 'int',
    default: Role.student,
  })
  user_type: number;

  @Column({
    type: 'varchar',
    default: 'default_avatar.webp',
  })
  avatar_url: string;

  @OneToMany(() => Classes, (classes) => classes.created_by)
  created_classes: Classes[];

  @ManyToMany(() => ExamPaper, (paper) => paper.created_by)
  created_exam_paper: ExamPaper[];

  @ManyToMany(() => ExamRoom, (room) => room.created_by)
  created_exam_room: ExamRoom[];

  @ManyToMany(() => Classes, (classes) => classes.users)
  join_classes: Classes[];
}
