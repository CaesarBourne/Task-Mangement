import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from '../../../core/task/task-status.enum';

export class FilterTaskDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  assigneeId?: number;
}