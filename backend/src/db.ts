import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}?ssl=true`,
  ssl: {
    rejectUnauthorized: false
  }
});

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
// })


// Nedan är event handlers för att logga händelser som sker i poolen. Detta loggas i terminalen. Fann att det var ett bra sätt att se aktiviteten i poolen. Just nu sker lite mer saker än jag förväntar mig, framför allt "Client checked out from the pool" men det får jag undersöka en annan dag.

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.on('connect', (client) => {
  console.log('Connected to the database')
})

pool.on('acquire', (client) => {
  console.log('Client checked out from the pool')
})

pool.on('remove', (client) => {
  console.log('Client removed')
})

export default pool
