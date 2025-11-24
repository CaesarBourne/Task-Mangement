import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

export interface TaskFilter {
  status?: TaskStatus;
  assigneeId?: number;
}

export interface ITaskRepository {
  findAll(filter?: TaskFilter): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(task: Omit<Task, 'id'>): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
  assignPerson(taskId: number, personId: number): Promise<void>;
}