import { TaskOrmEntity } from './task.orm-entity';

describe('TaskOrmEntity', () => {
  it('should be defined', () => {
    expect(new TaskOrmEntity()).toBeDefined();
  });
});
