
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function authMiddleware(req: Request, res: Response, next: NextFunction){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token){
    res.status(401).json({error: 'Unable to access this resource, credentials not provided'})
  }

  try{
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string);
    res.locals.token = decodedToken;
    next()
  }
  catch(err){
    console.error(err);
    return res.status(401).json({error: 'Invalid credentials'})
  }
}

export default authMiddleware;