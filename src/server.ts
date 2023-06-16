import App from './index';
import HealthController from './health/health.controller';
import UserController from './user/user.controller';
import UserService from './user/user.service';
import UserRepository from './user/user.repo';
import knex from 'knex';

const port = process.env.PORT || '8000';

const application = new App([
  new HealthController(),
  new UserController(new UserService(new UserRepository(knex('user')))),
]);

export default application.listen(port);
