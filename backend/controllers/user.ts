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
