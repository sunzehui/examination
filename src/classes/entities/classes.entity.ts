import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/common/module/user/entities/user.entity';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  id: string;

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
}
