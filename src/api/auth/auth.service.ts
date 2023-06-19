import UserService from '../user/user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import InvalidCredentialsException from '../../exceptions/InvalidCredentialsException';
import * as dotenv from 'dotenv';
dotenv.config();

class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async verifyLogin(email: string, password: string) {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new UserNotFoundException(email);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new InvalidCredentialsException();

      const token = await this.createToken(user.id);
      return token;
  }

  public async hashPassword(password: string){
    const hashedPassword = await bcrypt.hash(password, process.env.HASH_ROUNDS as string);
    return hashedPassword;
  }

  private async createToken(userId: string) {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }
}

export default AuthService;
