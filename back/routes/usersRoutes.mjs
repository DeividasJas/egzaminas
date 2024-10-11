import express from 'express';

import {
  signupUser,
  loginUser,
  getUserById,
  deletedUserById
} from '../controllers/usersController.mjs';

import { signupValidation, loginValidation } from '../middlewares/validation/loginSingupValidation.mjs';


import { isAdmin, isUser } from '../middlewares/authorizationMiddleware.mjs';

const router = express.Router();

// router.route('/test').get(test);
router.route('/signup').post( signupUser);
router.route('/login').post(loginValidation, loginUser);
router.route('/remove/:id').delete(deletedUserById);
router.route('/:id').get(getUserById)


export default router;
