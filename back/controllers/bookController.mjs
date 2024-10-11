import { validationResult } from 'express-validator';
import {
  pg_postBook,
  pg_deleteBookById,
  pg_getAllBooks,
  pg_reserveBook,
  pg_extendBook,
  pg_getAllUserReservations,
} from '../models/bookModel.mjs';

export const postBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, author, releaseDate, categoryId } = req.body;
    const newBook = await pg_postBook(name, author, releaseDate, categoryId);
    res.status(201).json(newBook);
    if (newBook.length === 0) {
      res.status(400).json({ message: 'Error while adding new book' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await pg_deleteBookById(id);
    res.status(200).json(deletedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await pg_getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const reserveBook = async (req, res) => {
  const { bookId } = req.params;
  const { id: userId } = req.user;
  console.log(1233333);

  try {
    const reservedBook = await pg_reserveBook(bookId, userId);
    console.log(reservedBook);

    res.status(201).json(reservedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const extendBook = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const extension = await pg_extendBook(reservationId);
    res.status(200).json(extension);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllUserReservations = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const reservations = await pg_getAllUserReservations(userId);

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
