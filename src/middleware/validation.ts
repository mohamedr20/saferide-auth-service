
import { NextFunction, Request, Response } from "express";
import Joi from 'joi';

function validationMiddleware(schema: Joi.ObjectSchema<any>){
  return (req: Request, res:Response, next:NextFunction) => {
    const {error} = schema.validate(req.body);
    if(error){
      res.status(400).send(error.details[0].message);
    }
    else{
      next()
    }
  }
}

export default validationMiddleware;