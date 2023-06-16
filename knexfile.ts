import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: 'host.docker.internal',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'infra/db/knex/migrations',
    },
    seeds: {
      directory: 'infra/db/knex/seeds',
    },
  },
};

export default config;
