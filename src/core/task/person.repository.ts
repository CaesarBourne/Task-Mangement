import { Person } from './person.entity';

export interface IPersonRepository {
  findById(id: number): Promise<Person | null>;
  findAll(): Promise<Person[]>;          
  create(person: Omit<Person, 'id'>): Promise<Person>;
}