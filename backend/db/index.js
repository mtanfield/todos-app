import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD, // Accessed from environment variable
      port: process.env.DB_PORT,
});

const query = (text, params) => pool.query(text, params);

export default { query };