import App from './index';
import HealthController from './health/health.controller';

const port = process.env.PORT || '8000';

const application = new App([new HealthController()]);

export default application.listen(port);
