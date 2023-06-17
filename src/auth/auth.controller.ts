import UserService from '../user/user.service';
import AuthService from './auth.service';
import { NextFunction, Request, Response, Router } from 'express';
import HttpException from '../exceptions/HttpException';

class AuthController {
  public path = '/auth';
  public router = Router();
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, this.login);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await this.authService.register(req.body);
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.authService.login(req.body);
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
