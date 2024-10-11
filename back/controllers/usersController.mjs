import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  pg_getAllUsers,
  pg_signupUser,
  pg_getUserByEmail,
  pg_getUserById,
  pg_deleteUserById
  // pg_addFollower,
  // pg_removeFollower,
  // pg_getFollowers,
  // pg_isFollowing,
} from '../models/usersModel.mjs';

import { validationResult } from 'express-validator';

// --------generate token----------------
const getToken = (id, name, lastName, email, role) => {
  const token = jwt.sign(
    { id, name, lastName, email, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
  return token;
};

export const signupUser = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      name,
      email,
      lastName,
      password,
      repeatPassword,
      role = 'user',
    } = req.body;
    if (password !== repeatPassword) {
      return res.status(400).json({ message: 'Passwords does not match ☹️' });
    }
    // if (role !== 'user' && role !== 'admin') {
    //   return res.status(400).json({ message: 'Role must be admin or user' });
    // }
    const existingUser = await pg_getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email is occupied' });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const signupUser = await pg_signupUser({
      name,
      email,
      lastName,
      role,
      password: hashedPassword,
    });

    // create token for new user (automatically log him in)
    const token = getToken(
      signupUser.id,
      signupUser.name,
      signupUser.lastName,
      signupUser.email,
      signupUser.role
    );
    console.log(token);
    
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email or password is missing 😤' });
    }

    const existingUser = await pg_getUserByEmail(email);

    //  check if user exist
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email does not exists' });
    }
    // compare existing user password with entered password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // if password doesn't match return
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: 'email or password does not match 😭' });
    }

    // if password and email matches create user new token
    const token = getToken(
      existingUser.id,
      existingUser.lastName,
      existingUser.name,
      existingUser.email,
      existingUser.role
    );

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pg_getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deletedUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await pg_deleteUserById(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
