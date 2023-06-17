import { NextFunction, Request, Response, Router } from 'express';

class AuthController {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/login`, this.login);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {

      console.log('')
    } catch (err) {
      next(err);
      res.json(err)
    }
  };
}

export default AuthController;
