import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { UserTypes } from '../types';
import User from '../models/User';

export interface Req extends Request {
  user?: HydratedDocument<UserTypes>;
}

const auth = async (req: Req, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      res.status(400).send({ success: false, message: 'No token provided' });
      return;
    }

    const user = await User.findOne({ token });

    if (!user) {
      res.status(400).send({ success: false, message: 'Wrong token!' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ success: false, message: 'Internal server error' });
    return;
  }
};

export default auth;
