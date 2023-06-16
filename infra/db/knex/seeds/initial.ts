import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  let hash = await bcrypt.hash('testPassword', 10);

  await knex('user').insert([
    {
      id: 1,
      email: faker.internet.exampleEmail(),
      passwordHash: hash,
      username: faker.internet.userName,
      phone: faker.phone,
      first_name: faker.person.firstName,
      last_name: faker.person.lastName,
    },
  ]);
}
