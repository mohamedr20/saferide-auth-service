import { NextFunction, Request, Response, Router } from 'express';
import UserService from './user.service';

class UserController {
  public path = '/user';
  public router = Router();
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.initalizeRoutes();
  }

  initalizeRoutes(): void {
    this.router.post(`${this.path}`, this.createUser);
    this.router.get(`${this.path}/:id`, this.findUser);
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { ...userInput } = req.body;

      const createUserResult = await this.userService.createUser(userInput);
      return res.json({ data: createUserResult }).status(200);
    } catch (err) {
      console.error(err);
      next(err);
      throw err;
    }
  };

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
}

export default UserController;
