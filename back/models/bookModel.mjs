import sql from '../postgres.mjs';

export const pg_postBook = async (name, author, releaseDate, categoryId) => {
  const newBook = await sql`
    INSERT INTO books (name, author, releasedate, categoryid)
    VALUES (${name}, ${author}, ${releaseDate}, ${categoryId})
    RETURNING *
    `;
  return newBook[0];
};

export const pg_deleteBookById = async (id) => {
  const deletedBook = await sql`
    DELETE FROM books
    WHERE id = ${id}
    RETURNING *
    `;
  return deletedBook[0];
};

export const pg_getAllBooks = async () => {
  const books = await sql`
    SELECT * FROM books`;
  return books;
};

export const pg_reserveBook = async (bookId, userId) => {
  const reservedBook = await sql`
    INSERT INTO reservations (bookid, userid)
    VALUES (${bookId}, ${userId})
    RETURNING *
    `;

  return reservedBook[0];
};

export const pg_extendBook = async (reservationId) => {
  try {
    const extension = await sql`
    UPDATE reservations
    SET extensioncount = extensioncount + 1
    WHERE id = ${reservationId}
    RETURNING *
    `;
    console.log(extension);

    return extension[0];
  } catch (error) {
    console.error(error);
  }
};

export const pg_getAllUserReservations = async (userId) => {
  const reservations = await sql`
    SELECT 
        r.*, 
        b.name AS book_name 
    FROM 
        reservations r
    JOIN 
        books b ON r.bookid = b.id
    WHERE 
        r.userid = ${userId}
    `;
  return reservations;
};
