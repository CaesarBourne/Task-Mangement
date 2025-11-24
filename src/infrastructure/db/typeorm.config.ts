import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskOrmEntity } from './task.orm-entity';
import { PersonOrmEntity } from './person.orm-entity';
import { AssignmentOrmEntity } from './assignment.orm-entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'tasks.sqlite',
  entities: [TaskOrmEntity, PersonOrmEntity, AssignmentOrmEntity],
  synchronize: true,
};