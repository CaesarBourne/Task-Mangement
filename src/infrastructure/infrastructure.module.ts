import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { TaskOrmEntity } from './db/task.orm-entity';
import { PersonOrmEntity } from './db/person.orm-entity';

import { NotificationHttpService } from './http/notification-http.service';

import {
  TASK_REPOSITORY,
  PERSON_REPOSITORY,
  NOTIFICATION_PORT,
} from '../core/task/tokens';
import { TaskRepositoryImpl } from './repositories/task.repository.impl';
import { PersonRepositoryImpl } from './repositories/person.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskOrmEntity, PersonOrmEntity]),
    HttpModule,
  ],
  providers: [
    TaskRepositoryImpl,
    PersonRepositoryImpl,
    NotificationHttpService,
    {
      provide: TASK_REPOSITORY,
      useExisting: TaskRepositoryImpl,
    },
    {
      provide: PERSON_REPOSITORY,
      useExisting: PersonRepositoryImpl,
    },
    {
      provide: NOTIFICATION_PORT,
      useExisting: NotificationHttpService,
    },
  ],
  exports: [TASK_REPOSITORY, PERSON_REPOSITORY, NOTIFICATION_PORT],
})
export class InfrastructureModule {}