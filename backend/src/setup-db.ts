import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const runSQLFile = async (filePath: string) => {
  const sql = readFileSync(resolve(filePath), 'utf-8');
  await pool.query(sql);
  console.log('Database setup complete.');
};

runSQLFile('sql/schema.sql').catch(err => console.error('Error setting up database:', err));