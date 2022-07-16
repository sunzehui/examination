import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 255, nullable: false })
  content: string;

  @Column({ type: 'char', length: 255, default: '暂无解析' })
  resolution: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  q_type: number;

  @OneToMany(() => ChoiceQ, (c) => c.question)
  choice: Relation<ChoiceQ>[];
  @OneToMany(() => FillBlankQ, (f) => f.question)
  fill_blank: Relation<FillBlankQ>[];
}

@Entity('choice')
export class ChoiceQ {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (q) => q.choice)
  question: Question;

  @Column({ type: 'char', length: 255, default: '' })
  content: string;

  @Column({ type: 'boolean', default: false })
  is_answer: boolean;
}

@Entity('fill_blank')
export class FillBlankQ {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (f) => f.fill_blank)
  question: Question;

  @Column({ type: 'char', nullable: false, length: 255 })
  pos: string;

  @Column({ type: 'char', nullable: false, length: 255 })
  content: string;
}
