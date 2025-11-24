import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { IPersonRepository } from '../../core/task/person.repository';
// import { Person } from '../../core/task/person.entity';
import { PersonOrmEntity } from '../db/person.orm-entity';
import { toDomainPerson } from './mappers';

@Injectable()
export class PersonRepositoryImpl  {
  constructor(
    @InjectRepository(PersonOrmEntity)
    private readonly repo: Repository<PersonOrmEntity>,
  ) {}

  async findById(id: number): Promise<any | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? toDomainPerson(entity) : null;
  }

  async findAll(): Promise<any[]> {          // <--- NEW
    const entities = await this.repo.find();
    return entities.map(toDomainPerson);
  }

  async create(person: Omit<any, 'id'>): Promise<any> {
    const entity = this.repo.create({
      name: person.name,
      email: person.email,
    });
    const saved = await this.repo.save(entity);
    return toDomainPerson(saved);
  }
}