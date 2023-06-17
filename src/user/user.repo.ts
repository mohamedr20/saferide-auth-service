import { Knex } from 'knex';
import KnexRepository from '../repo';
import User from './user';

class UserRepository extends KnexRepository<User> {
  constructor(public readonly knex: Knex<User, User[]>) {
    super(knex, 'user');
  }

  findUserByEmail(email: string): Promise<User> {
    return this.queryBuilder.where('email', '=', email).select().first();
  }
}

export default UserRepository;
