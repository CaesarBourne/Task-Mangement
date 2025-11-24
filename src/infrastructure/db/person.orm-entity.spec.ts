import { PersonOrmEntity } from './person.orm-entity';

describe('PersonOrmEntity', () => {
  it('should be defined', () => {
    expect(new PersonOrmEntity()).toBeDefined();
  });
});
