DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  progress_status INT NOT NULL CHECK (progress_status BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  item_name VARCHAR(100) NOT NULL,
  item_price DECIMAL(10, 2) NOT NULL,
  picked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_order_total_on_insert_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
  SET total_amount = (
    SELECT COALESCE(SUM(item_price), 0)
    FROM items
    WHERE order_id = NEW.order_id
  )
  WHERE id = NEW.order_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update total amount when an item is deleted
CREATE OR REPLACE FUNCTION update_order_total_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
  SET total_amount = (
    SELECT COALESCE(SUM(item_price), 0)
    FROM items
    WHERE order_id = OLD.order_id
  )
  WHERE id = OLD.order_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update total amount on insert or update
CREATE TRIGGER update_order_total_on_insert
AFTER INSERT OR UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION update_order_total_on_insert_update();

-- Trigger to update total amount on delete
CREATE TRIGGER update_order_total_on_delete
AFTER DELETE ON items
FOR EACH ROW
EXECUTE FUNCTION update_order_total_on_delete();
