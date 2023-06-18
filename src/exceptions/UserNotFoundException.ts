import HttpException from './HttpException';

class UserNotFoundException extends HttpException {
  constructor(email: string) {
    super(404, `User not found for this address: ${email}`);
  }
}

export default UserNotFoundException;
