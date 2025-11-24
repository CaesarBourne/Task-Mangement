import { Inject, Injectable, Optional } from '@nestjs/common';
import * as personRepository from './person.repository';

import {
  TASK_REPOSITORY,
  PERSON_REPOSITORY,
  NOTIFICATION_PORT,
} from './tokens';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import type { ITaskRepository, TaskFilter } from './task.repository';

export interface NotificationPort {
  notifyAssignment(task: Task, personId: number): Promise<void>;
}

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: ITaskRepository,

    @Inject(PERSON_REPOSITORY)
    private readonly personRepo: personRepository.IPersonRepository,

    @Optional()
    @Inject(NOTIFICATION_PORT)
    private readonly notificationPort?: NotificationPort,
  ) {}

  async listTasks(filter?: TaskFilter): Promise<Task[]> {
    return this.taskRepo.findAll(filter);
  }

  async createTask(input: {
    title: string;
    description?: string | null;
  }): Promise<Task> {
    const now = new Date();
    const task = new Task(
      null,
      input.title,
      input.description ?? null,
      TaskStatus.PENDING,
      now,
      now,
      [],
    );
    return this.taskRepo.create(task);
  }

  async updateTask(
    id: number,
    updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>,
  ): Promise<Task> {
    const existing = await this.taskRepo.findById(id);
    if (!existing) {
      throw new Error('TASK_NOT_FOUND');
    }

    if (updates.title !== undefined) existing.title = updates.title;
    if (updates.description !== undefined)
      existing.description = updates.description;
    if (updates.status !== undefined) existing.status = updates.status;

    existing.updatedAt = new Date();
    return this.taskRepo.update(existing);
  }

  async deleteTask(id: number): Promise<void> {
    const existing = await this.taskRepo.findById(id);
    if (!existing) return;
    await this.taskRepo.delete(id);
  }

  async assignPerson(taskId: number, personId: number): Promise<Task> {
    const [task, person] = await Promise.all([
      this.taskRepo.findById(taskId),
      this.personRepo.findById(personId),
    ]);

    if (!task) throw new Error('TASK_NOT_FOUND');
    if (!person) throw new Error('PERSON_NOT_FOUND');

    await this.taskRepo.assignPerson(taskId, personId);

    if (this.notificationPort) {
      await this.notificationPort.notifyAssignment(task, personId);
    }

    const updated = await this.taskRepo.findById(taskId);
    if (!updated) throw new Error('TASK_NOT_FOUND_AFTER_ASSIGN');

    return updated;
  }
}