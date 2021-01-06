import { Request, Response, NextFunction } from 'express';
import { loginValidation, signupValidation } from '../helpers/validation';
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
    res.json({
      token: jwt.sign({ _id, isAdmin }, process.env.JWT_SECRET),
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
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = signupValidation(req.body);
    if (error) throw error;
    const { username, email, password: unhashedPassword } = req.body;
    if (await UserModel.findOne({ email })) {
      throw new Error('User Already exist');
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(unhashedPassword, salt);
    const user = await new UserModel({
      username,
      email,
      password,
    }).save();
    if (user) {
      res.status(201).json({
        token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
        _id: user._id,
        username,
        email,
        isAdmin: user.isAdmin,
      });
    } else {
      throw new Error('Invalid User Data');
    }
  } catch (err) {
    res.status(400);
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
