import { NextFunction, Request, Response, Router } from 'express';
import UserService from './user.service';
import {mapUserToDB, User} from './user.model';

class UserController {
  public path = '/user';
  public router = Router();
  private userService: UserService;

  constructor() {
    this.userService = new UserService()
    this.initalizeRoutes();
  }

  initalizeRoutes(): void {
    this.router.get(`${this.path}`, this.findUsers)
    this.router.get(`${this.path}/:id`, this.findUser);
    this.router.post(`${this.path}`, this.createUser);
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

  findUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users: User[] = await this.userService.findUsers();
      return res.json({ data: users }).status(200);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createUserResponse = await this.userService.registerUser(req.body);

      return res.json({ data: createUserResponse }).status(201);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
