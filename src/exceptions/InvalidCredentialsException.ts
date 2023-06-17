import HttpException from './HttpException';

class InvalidCredentialsException extends HttpException {
  constructor(errorMsg: string) {
    super(400, `${errorMsg}`);
  }
}

export default InvalidCredentialsException;
