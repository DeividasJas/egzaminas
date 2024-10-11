import express from 'express';
import {
  signupValidation,
  loginValidation,
} from '../middlewares/validation/loginSingupValidation.mjs';
import { isAdmin, isUser } from '../middlewares/authorizationMiddleware.mjs';
import { addCategory, getAllCategories, removeCategory } from '../controllers/categoryController.mjs';



const router = express.Router();
// with middleware to check if user is admin
router.route('/').post(isAdmin, addCategory).get(isUser, getAllCategories);
router.route('/:id').delete(isAdmin, removeCategory);

export default router;
