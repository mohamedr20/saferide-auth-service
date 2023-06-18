import HttpException from './HttpException';

class ExsistingUserException extends HttpException {
  constructor(errorMsg: string) {
    super(400, `${errorMsg}`);
  }
}

export default ExsistingUserException;
