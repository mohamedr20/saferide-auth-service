import express, { Application, Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import errorMiddleware from './middleware/error';

interface Controller {
  path: string;
  router: Router;
}

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      '/api/docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument)
    );
    this.initializeControllers(controllers);
    this.app.use(errorMiddleware)
  }

  public listen(port: string) {
    this.app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/api', controller.router);
    });
  }
}

export default App;
