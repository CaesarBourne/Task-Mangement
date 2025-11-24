import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ITaskRepository,
  TaskFilter,
} from '../../core/task/task.repository';
import { Task } from '../../core/task/task.entity';
import { TaskOrmEntity } from '../db/task.orm-entity';
import { toDomainTask } from './mappers';

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repo: Repository<TaskOrmEntity>,
  ) {}

  async findAll(filter?: TaskFilter): Promise<Task[]> {
    const qb = this.repo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignees', 'assignee');

    if (filter?.status) {
      qb.andWhere('task.status = :status', { status: filter.status });
    }

    if (filter?.assigneeId) {
      qb.andWhere('assignee.id = :assigneeId', {
        assigneeId: filter.assigneeId,
      });
    }

    const entities = await qb.getMany();
    return entities.map(toDomainTask);
  }

  async findById(id: number): Promise<Task | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['assignees'],
    });
    return entity ? toDomainTask(entity) : null;
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const entity = this.repo.create({
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
    const saved = await this.repo.save(entity);
    // no assignees on creation
    saved.assignees = [];
    return toDomainTask(saved);
  }

  async update(task: Task): Promise<Task> {
    await this.repo.update(task.id!, {
      title: task.title,
      description: task.description,
      status: task.status,
      updatedAt: task.updatedAt,
    });
    const updated = await this.repo.findOne({
      where: { id: task.id! },
      relations: ['assignees'],
    });
    if (!updated) {
      throw new Error('TASK_NOT_FOUND_AFTER_UPDATE');
    }
    return toDomainTask(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async assignPerson(taskId: number, personId: number): Promise<void> {
    const task = await this.repo.findOne({
      where: { id: taskId },
      relations: ['assignees'],
    });
    if (!task) throw new Error('TASK_NOT_FOUND');

    task.assignees = task.assignees || [];
    if (!task.assignees.find((a) => a.id === personId)) {
      task.assignees.push({ id: personId } as any);
      await this.repo.save(task);
    }
  }
}