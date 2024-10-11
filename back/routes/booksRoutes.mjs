import express from 'express';
import {
  signupValidation,
  loginValidation,
} from '../middlewares/validation/loginSingupValidation.mjs';
import { isAdmin, isUser } from '../middlewares/authorizationMiddleware.mjs';
import {
  postBook,
  deleteBookById,
  getAllBooks,
  reserveBook,
  extendBook,
  getAllUserReservations,
} from '../controllers/bookController.mjs';

const router = express.Router();

router.route('/').post(isAdmin, postBook).get(isUser, getAllBooks);
router.route('/reserved').get(isUser, getAllUserReservations)
router.route('/extend/:reservationId').post(isUser, extendBook);
router.route('/reserve/:bookId').post(isUser,reserveBook);
router.route('/:id').delete(isAdmin, deleteBookById);

export default router;
