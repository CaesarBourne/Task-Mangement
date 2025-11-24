import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TaskController } from './task/task.controller';
import { TaskService } from '../core/task/task.service';
import { PersonService } from '../core/task/person.service';
import { PersonController } from './person/person.contrller';

@Module({
  imports: [InfrastructureModule],
  controllers: [TaskController, PersonController],
  providers: [TaskService, PersonService],
})
export class PresentationModule {}