import { Module } from '@nestjs/common';
import { Task } from './repositories/task';
import { Person } from './repositories/person';
import { NotificationHttpService } from './http/notification-http.service';

@Module({
  providers: [Task, Person, NotificationHttpService]
})
export class InfrastructureModule {}
