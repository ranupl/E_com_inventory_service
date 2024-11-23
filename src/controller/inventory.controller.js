const Inventory = require('../model/inventory.model');

const createInventory = (req, res) => {
  const { product_id, quantity_available, reserved_quantity } = req.body;
  Inventory.create(product_id, quantity_available, reserved_quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Inventory record created', data: result });
  });
};

const getAllInventory = (req, res) => {
  Inventory.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ data: results });
  });
};

const getInventoryById = (req, res) => {
  const { product_id } = req.params;
  Inventory.getById(product_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.length) return res.status(404).json({ message: 'Inventory record not found' });
    res.status(200).json({ data: result });
  });
};

const updateInventory = (req, res) => {
  const { product_id } = req.params;
  const { quantity_available, reserved_quantity } = req.body;
  Inventory.update(product_id, quantity_available, reserved_quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Inventory updated successfully', data: result });
  });
};

const deleteInventory = (req, res) => {
  const { product_id } = req.params;
  Inventory.delete(product_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Inventory record deleted' });
  });
};

const reserveStock = (req, res) => {
  const { product_id } = req.params;
  const { quantity } = req.body;
  Inventory.reserveStock(product_id, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Stock reserved', data: result });
  });
};

const releaseStock = (req, res) => {
  const { product_id } = req.params;
  const { quantity } = req.body;
  Inventory.releaseStock(product_id, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Reserved stock released', data: result });
  });
};

const getLowStock = (req, res) => {
  const { threshold } = req.query;
  Inventory.getLowStock(threshold, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ data: results });
  });
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
  reserveStock,
  releaseStock,
  getLowStock,
};
