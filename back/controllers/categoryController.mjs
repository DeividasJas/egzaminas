import { validationResult } from 'express-validator';
import { pg_addCategory, pg_removeCategory, pg_getAllCategories } from '../models/categoryModel.mjs';

export const addCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { categoryName } = req.body;
    const newCategory = await pg_addCategory(categoryName);
    res.status(201).json(newCategory);
    if (newCategory.length === 0) {
      res.status(400).json({ message: 'Error while adding new category' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const removeCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await pg_removeCategory(id);
    if (deletedCategory.length === 0) {
      res.status(400).json({ message: 'Error while deleting category' });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await pg_getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
