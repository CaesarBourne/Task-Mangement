import { TaskRepository } from './task.repository';

describe('TaskRepository', () => {
  it('should be defined', () => {
    expect(new TaskRepository()).toBeDefined();
  });
});
