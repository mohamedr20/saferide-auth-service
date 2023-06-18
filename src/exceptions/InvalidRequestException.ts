import HttpException from './HttpException';

class InvalidRequestException extends HttpException {
  constructor(errorMsg: string) {
    super(400, `${errorMsg}`);
  }
}

export default InvalidRequestException;
