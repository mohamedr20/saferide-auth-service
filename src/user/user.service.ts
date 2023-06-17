import User from './user';
import dotenv from 'dotenv';
import UserRepository from './user.repo';

dotenv.config();

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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

  async findUserByEmail(email: string): Promise<User> {
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
        'firstName',
        'lastName',
        'phone',
      ]);
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async createUser(userInput: Partial<User>) {
    try {
      console.log('Inside userService.createUser');

      const createUserResult = await this.userRepository.insert(userInput);
      return createUserResult;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default UserService;
