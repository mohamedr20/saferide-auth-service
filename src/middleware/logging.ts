import { NextFunction, Request, Response } from "express";

function logHandler(err: Error, req: Request, res:Response, next:NextFunction){
  console.log(err);
  console.log(req);
  console.log(res);
  next(err);
}

export default logHandler;