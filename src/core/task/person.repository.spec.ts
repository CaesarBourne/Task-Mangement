import { PersonRepository } from './person.repository';

describe('PersonRepository', () => {
  it('should be defined', () => {
    expect(new PersonRepository()).toBeDefined();
  });
});
