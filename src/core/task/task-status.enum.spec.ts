import { TaskStatusEnum } from './task-status.enum';

describe('TaskStatusEnum', () => {
  it('should be defined', () => {
    expect(new TaskStatusEnum()).toBeDefined();
  });
});
