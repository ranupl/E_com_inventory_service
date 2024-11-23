const db = require('../db/connection');

const Inventory = {
  create: (product_id, quantity_available, reserved_quantity, callback) => {
    const sql = `
      INSERT INTO inventory (product_id, quantity_available, reserved_quantity, updated_at)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(sql, [product_id, quantity_available, reserved_quantity], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM inventory';
    db.query(sql, callback);
  },

  getById: (product_id, callback) => {
    const sql = 'SELECT * FROM inventory WHERE product_id = ?';
    db.query(sql, [product_id], callback);
  },

  update: (product_id, quantity_available, reserved_quantity, callback) => {
    const sql = `
      UPDATE inventory
      SET quantity_available = ?, reserved_quantity = ?, updated_at = NOW()
      WHERE product_id = ?
    `;
    db.query(sql, [quantity_available, reserved_quantity, product_id], callback);
  },

  delete: (product_id, callback) => {
    const sql = 'DELETE FROM inventory WHERE product_id = ?';
    db.query(sql, [product_id], callback);
  },

  reserveStock: (product_id, quantity, callback) => {
    const sql = `
      UPDATE inventory
      SET quantity_available = quantity_available - ?, reserved_quantity = reserved_quantity + ?, updated_at = NOW()
      WHERE product_id = ? AND quantity_available >= ?
    `;
    db.query(sql, [quantity, quantity, product_id, quantity], callback);
  },

  releaseStock: (product_id, quantity, callback) => {
    const sql = `
      UPDATE inventory
      SET quantity_available = quantity_available + ?, reserved_quantity = reserved_quantity - ?, updated_at = NOW()
      WHERE product_id = ? AND reserved_quantity >= ?
    `;
    db.query(sql, [quantity, quantity, product_id, quantity], callback);
  },

  getLowStock: (threshold, callback) => {
    const sql = 'SELECT * FROM inventory WHERE quantity_available < ?';
    db.query(sql, [threshold], callback);
  },
};

module.exports = Inventory;
