import postgres from 'postgres';

const sql = postgres({
  host: 'localhost', // Postgres server
  port: 5433, // Postgres server port
  database: 'egzaminas', // Database name
  username: 'postgres', // Database username
  password: '', // Database password
});

export default sql;