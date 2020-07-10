import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @Column()
  userId: number;

  // Cascade, u can create user from a task
  @ManyToOne(() => User, user => user.tasks, {
    cascade: true,
  })
  user: User;
}
