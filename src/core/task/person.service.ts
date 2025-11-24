import { Inject, Injectable } from '@nestjs/common';
import { PERSON_REPOSITORY } from './tokens';
import { Person } from './person.entity';
import type { IPersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly personRepo: IPersonRepository,
  ) {}

  async createPerson(input: { name: string; email: string }): Promise<Person> {
    return this.personRepo.create({
      name: input.name,
      email: input.email,
    });
  }

  async listPeople(): Promise<Person[]> {
    return this.personRepo.findAll();
  }

  async getPerson(id: number): Promise<Person | null> {
    return this.personRepo.findById(id);
  }
}