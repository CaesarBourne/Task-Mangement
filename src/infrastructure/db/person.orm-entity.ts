import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { TaskOrmEntity } from './task.orm-entity';

@Entity('people')
export class PersonOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToMany(() => TaskOrmEntity, (task) => task.assignees)
  tasks!: TaskOrmEntity[];
}