import sql from '../postgres.mjs';

export const pg_addCategory = async (categoryName) => {
  const newBook = await sql`
    INSERT INTO bookcategories (name)
    VALUES (${categoryName})
    RETURNING *`;
  return newBook[0];
};

export const pg_removeCategory = async (id) => {
  const deletedCategory = await sql`
  DELETE FROM bookcategories
  WHERE id = ${id}
  RETURNING *`;
  return deletedCategory[0];
}

export const pg_getAllCategories = async () => {
  const categories = await sql`
  SELECT * FROM bookcategories`;
  return categories
}