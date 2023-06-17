import * as dotenv from 'dotenv';
import knexConfig from './knexfile';
dotenv.config();

const enviroment = process.env.ENVIROMENT || 'development';
const dbConfig = knexConfig[enviroment];

export default dbConfig;
