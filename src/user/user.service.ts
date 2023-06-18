import { User, mapUserToDB } from './user.model';
import UserRepository from './user.repo';
import AuthService from '../auth/auth.service';
import knex from 'knex';
import dbConfig from '../../knexfile';
import ExsistingUserException from '../exceptions/ExsistingUserException';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(
      knex(dbConfig['development']),
      'user'
    );
  }

  public async findUser(id: string) {
    try {
      console.log('Inside userService.findUser');

      const users = await this.userRepository.findOne(id);
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async findUserByEmail(email: string) {
    try {
      console.log(`Inside userService.findByEmail... email:${email}`);

      const user = await this.userRepository.findUserByEmail(email);
      return user;
    } catch (err) {
      throw err;
    }
  }

  public async findUsers() {
    try {
      console.log('Inside userService.findUsers');

      const users = await this.userRepository.find([
        'username',
        'email',
        'phone',
      ]);

      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async registerUser(registerBody: User) {
    console.log('Inside userService.createUser');

    const userInput = mapUserToDB(registerBody);
    const exsistingUser = await this.userRepository.findUserByEmail(
      userInput.email
    );

    if (exsistingUser) {
      throw new ExsistingUserException('A user already exsists for this email');
    }

    userInput.password = bcrypt.hashSync(userInput.password);

    const createUserResult = await this.userRepository.insert(userInput);
    return createUserResult;
  }
}

export default UserService;
