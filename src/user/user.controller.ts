import { NextFunction, Request, Response, Router } from 'express';
import UserService from './user.service';

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
  }

  private findUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUser(id);

      return res.json({ data: user }).status(200);
    } catch (err) {
      console.error(err);
      next(err);
      throw err;
    }
  };

  private findUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const users = await this.userService.findUsers();
      return res.json({ data: users }).status(200);
    } catch (err) {
      console.error(err);
      next(err);
      throw err;
    }
  };
}

export default UserController;
