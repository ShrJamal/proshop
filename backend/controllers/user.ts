import { Request, Response, NextFunction } from 'express';
import { loginValidation } from '../helpers/validation';
import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { error } = loginValidation(req.body);
    if (error) throw error;
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Email or Password is invalid');
    }
    const { _id, username, isAdmin } = user;
    const token = jwt.sign({ _id, isAdmin }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({
      token,
      _id,
      username,
      email,
      isAdmin,
    });
  } catch (err) {
    res.status(401);
    next(err);
  }
}

export async function userProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const _id = req.body._id;
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error('Ooops! Cant find user');
    }
    res.json({
      _id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(401);
    next(err);
  }
}
