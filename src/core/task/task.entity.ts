import { Person } from './person.entity';
import { TaskStatus } from './task-status.enum';

export class Task {
  constructor(
    public readonly id: number | null,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public assignees: Person[] = [],
  ) {}

  markDone() {
    this.status = TaskStatus.DONE;
    this.updatedAt = new Date();
  }
}