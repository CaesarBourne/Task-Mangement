import { IsInt, Min } from 'class-validator';

export class AssignPersonDto {
  @IsInt()
  @Min(1)
  personId!: number;
}