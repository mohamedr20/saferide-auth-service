import { NextFunction, Request, Response, Router } from 'express';
import UserService from './user.service';
import { User } from './user.model';
import validationMiddleware from '../../middleware/validation';
import authMiddleware from '../../middleware/auth';
import registerSchema from '../../validations/register.validation';

class UserController {
  public path = '/user';
  public router = Router();
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.initalizeRoutes();
  }

  initalizeRoutes(): void {
    this.router.get(`${this.path}`, authMiddleware, this.findUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.findUser);
    this.router.post(
      `${this.path}`,
      validationMiddleware(registerSchema),
      this.createUser
    );
  }

  private findUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user: User = await this.userService.findUser(id);

      return res.json({ data: user }).status(200);
    } catch (err) {
      next(err);
    }
  };

  findUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: User[] = await this.userService.findUsers();
      return res.json({ data: users }).status(200);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createUserResponse = await this.userService.registerUser(req.body);

      return res.json({ data: createUserResponse }).status(201);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
