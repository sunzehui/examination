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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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
    enum: Role,
  })
  user_type: number;

  @OneToMany(() => Classes, (classes) => classes.created_by)
  created_class: Classes[];

  @ManyToMany(() => Classes, (classes) => classes.users)
  join_class: Classes[];
}
