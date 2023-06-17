import App from './index';
import HealthController from './health/health.controller';
import UserController from './user/user.controller';
// import UserService from './user/user.service';
// import UserRepository from './user/user.repo';
// import knex from 'knex';
import AuthController from './auth/auth.controller';

const port = process.env.PORT || '8000';

const application = new App([
  new HealthController(),
  new AuthController(),
  new UserController()
]);

export default application.listen(port);