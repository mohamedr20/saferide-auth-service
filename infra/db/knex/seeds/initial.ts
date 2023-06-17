import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  await knex('user').insert([
    {
      id: 1,
      email: 'test@email.com',
      username: 'mohamedr20',
      phone: '571-093-2134',
      first_name: 'Mohamed',
      last_name: 'Isse',
    },
  ]);
}
