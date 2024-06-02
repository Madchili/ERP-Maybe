import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
})

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
