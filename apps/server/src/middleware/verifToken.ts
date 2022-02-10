import jwt from 'jsonwebtoken'
import { ErrorUnAuthenticated } from './../lib/Errors';
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { API_SECRET } from '../config/env';


const prisma = new PrismaClient()

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    // const [prefix, token] = req?.headers?.authorization?.split(' ') ?? ['', '']

    // get token from access_token by explode and get first index
    // if (prefix !== 'Bearer' || token === '') throw new ErrorUnAuthenticated();

    // @ts-ignore
    jwt.verify(token, API_SECRET, function (err, decode) {
      if (!decode) throw new ErrorUnAuthenticated()

      // @ts-ignore
      const id = decode.id;

      prisma.user.findFirst({
        where: { id }
      }).then(user => {
        if (!user) throw new ErrorUnAuthenticated()
        req.user = user;

        next();
      }).catch(next)
    })
  } catch (error) {
    next(error)
  }
}

export default verifyToken