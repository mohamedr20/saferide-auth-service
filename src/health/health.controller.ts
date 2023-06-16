import { Request, Response, NextFunction, Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

class HealthController {
  public path = '/health';
  public router = Router();

  constructor() {
    this.initalizeRoutes();
  }

  initalizeRoutes(): void {
    this.router.get(`${this.path}`, this.checkHealth);
  }

  private checkHealth = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      return res.json({ status: 'Healthy' }).status(200);
    } catch (err) {
      console.error(err);
      next(err);
      throw err;
    }
  };
}

export default HealthController;
