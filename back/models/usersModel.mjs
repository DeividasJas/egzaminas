import sql from '../postgres.mjs';

export const pg_getAllUsers = async () => {
  const users = await sql`
  SELECT * FROM users`;
  return users
};

export const pg_getUserByEmail = async (email) => {
  const user = await sql`
  SELECT * FROM users
  WHERE email = ${email}`;
  return user[0];
};

export const pg_getUserById = async (id) => {
  const user = await sql`
  SELECT * FROM users
  WHERE id = ${id}`;
  return user[0];
};

export const pg_signupUser = async (userData) => {
  const { name, email, lastName, password, role } = userData;
  console.log(userData);
  
  const newUser = await sql`
  INSERT INTO users (name, lastName, email, password, role)
  VALUES (${name}, ${lastName}, ${email}, ${password}, ${role})
  RETURNING *`;
  return newUser[0];
};

export const pg_deleteUserById = (id) => {
  const deletedUser = sql`
  DELETE FROM users
  WHERE id = ${id}
  RETURNING *`;
  
  return deletedUser[0]
}