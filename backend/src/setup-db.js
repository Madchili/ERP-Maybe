// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('mydatabase.db');

// db.serialize(() => {

//   db.run("DROP TABLE IF EXISTS items");
//   db.run("DROP TABLE IF EXISTS orders");
//   db.run("DROP TABLE IF EXISTS users");


//   db.run(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       username VARCHAR(50) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       email VARCHAR(100) UNIQUE NOT NULL,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
//   `);

//   db.run(`
//     CREATE TABLE IF NOT EXISTS orders (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id INTEGER,
//       total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
//       progress_status INTEGER NOT NULL CHECK (progress_status BETWEEN 1 AND 5),
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES users(id)
//     )
//   `);


//   db.run(`
//     CREATE TABLE IF NOT EXISTS items (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       order_id INTEGER,
//       item_name VARCHAR(100) NOT NULL,
//       item_price DECIMAL(10, 2) NOT NULL,
//       picked BOOLEAN DEFAULT FALSE,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (order_id) REFERENCES orders(id)
//     )
//   `);
// });

// db.close();
