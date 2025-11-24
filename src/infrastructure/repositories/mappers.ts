import { TaskOrmEntity } from '../db/task.orm-entity';
import { PersonOrmEntity } from '../db/person.orm-entity';
import { Task } from '../../core/task/task.entity';
import { Person } from '../../core/task/person.entity';
import { TaskStatus } from 'src/core/task/task-status.enum';

export function toDomainPerson(e: PersonOrmEntity): Person {
  return new Person(e.id, e.name, e.email);
}

export function toDomainTask(e: TaskOrmEntity): Task {
  return new Task(
    e.id,
    e.title,
    e.description,
    e.status as TaskStatus,
    e.createdAt,
    e.updatedAt,
    e.assignees?.map(toDomainPerson) ?? [],
  );
}