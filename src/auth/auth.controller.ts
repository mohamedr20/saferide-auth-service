import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '../middleware/validation';
import loginSchema from '../validations/login.validation';
import AuthService from './auth.service';

class AuthController {
  public path = '/auth';
  public router = Router();
  private authService: AuthService;

  constructor() {
    this.initializeRoutes();
    this.authService = new AuthService();
  }

  initializeRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(loginSchema),
      this.login
    );
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const accessToken = await this.authService.verifyLogin(email, password);
      
      return res.json({ data: accessToken });
    } catch (err) {
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {

  };
}

export default AuthController;
