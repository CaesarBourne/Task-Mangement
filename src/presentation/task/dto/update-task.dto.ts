import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from 'src/core/task/task-status.enum';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}