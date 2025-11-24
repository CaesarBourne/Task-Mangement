import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from '../../core/task/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignPersonDto } from './dto/assign-person.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async list(@Query() filter: FilterTaskDto) {
    return this.taskService.listTasks(filter);
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    try {
      return await this.taskService.updateTask(id, body);
    } catch (error) {
      if ((error as Error).message === 'TASK_NOT_FOUND') {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
    return { success: true };
  }

  @Post(':id/assign')
  async assign(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AssignPersonDto,
  ) {
    try {
      return await this.taskService.assignPerson(id, body.personId);
    } catch (error) {
      const msg = (error as Error).message;
      if (msg === 'TASK_NOT_FOUND') {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      if (msg === 'PERSON_NOT_FOUND') {
        throw new HttpException('Person not found', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }
}