import App from './index';
import HealthController from './api/health/health.controller';
import UserController from './api/user/user.controller';
import AuthController from './api/auth/auth.controller';

const port = process.env.PORT || '8000';

const application = new App([
  new HealthController(),
  new AuthController(),
  new UserController()
]);

export default application.listen(port);