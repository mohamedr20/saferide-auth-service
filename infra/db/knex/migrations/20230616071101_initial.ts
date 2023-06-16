import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary().notNullable();
    table.string('username', 150);
    table.string('email', 100).unique().notNullable();
    table.string('passwordHash', 150);
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('phone', 100);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
