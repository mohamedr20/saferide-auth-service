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
