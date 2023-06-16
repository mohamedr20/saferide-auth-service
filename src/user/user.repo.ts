import { Knex } from 'knex';
import KnexRepository from '../repo';
import User from './user';

class UserRepository extends KnexRepository<User> {
  constructor(public readonly knex: Knex) {
    super(knex, 'user');
  }
}

export default UserRepository;
