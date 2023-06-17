import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * @type {Object<string, import("knex").Knex.Config>}
*/

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: 'host.docker.internal',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'infra/db/knex/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: 'infra/db/knex/seeds',
      extension: 'ts'
    },
  },
};

export default config;
