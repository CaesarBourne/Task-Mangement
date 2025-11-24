import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { anyOrmEntity } from '../db/any.orm-entity';
// import { toDomainany } from './mappers';

@Injectable()
export class anyRepositoryImpl  {
  constructor(
    private readonly repo: Repository<any>,
  ) {}

  async findAll(filter?: any): Promise<any[]> {
    const qb = this.repo
      .createQueryBuilder('any')
      .leftJoinAndSelect('any.assignees', 'assignee');

    if (filter?.status) {
      qb.andWhere('any.status = :status', { status: filter.status });
    }

    if (filter?.assigneeId) {
      qb.andWhere('assignee.id = :assigneeId', {
        assigneeId: filter.assigneeId,
      });
    }

    const entities = await qb.getMany();
    return entities.map(toDomainany);
  }

  async findById(id: number): Promise<any | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['assignees'],
    });
    return entity ? toDomainany(entity) : null;
  }

  async create(any: Omit<any, 'id'>): Promise<any> {
    const entity = this.repo.create({
      title: any.title,
      description: any.description,
      status: any.status,
      createdAt: any.createdAt,
      updatedAt: any.updatedAt,
    });
    const saved = await this.repo.save(entity);
    // no assignees on creation
    saved.assignees = [];
    return toDomainany(saved);
  }

  async update(any: any): Promise<any> {
    await this.repo.update(any.id!, {
      title: any.title,
      description: any.description,
      status: any.status,
      updatedAt: any.updatedAt,
    });
    const updated = await this.repo.findOne({
      where: { id: any.id! },
      relations: ['assignees'],
    });
    if (!updated) {
      throw new Error('any_NOT_FOUND_AFTER_UPDATE');
    }
    return toDomainany(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async assignPerson(anyId: number, personId: number): Promise<void> {
    const any = await this.repo.findOne({
      where: { id: anyId },
      relations: ['assignees'],
    });
    if (!any) throw new Error('any_NOT_FOUND');

    any.assignees = any.assignees || [];
    if (!any.assignees.find((a) => a.id === personId)) {
      any.assignees.push({ id: personId } as any);
      await this.repo.save(any);
    }
  }
}