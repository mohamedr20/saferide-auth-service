import * as dotenv from 'dotenv';
import knex from 'knex';
const knexConfig = require('./knexfile');
dotenv.config();

const enviroment = process.env.ENVIROMENT || 'development';
const dbConfig = knexConfig[enviroment];

export default dbConfig;
