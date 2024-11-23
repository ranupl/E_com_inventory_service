const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventory.controller');

router.post('/createInventory', inventoryController.createInventory); 
router.get('/getAllInventory', inventoryController.getAllInventory); 
router.get('/getInventoryById/:product_id', inventoryController.getInventoryById); 
router.put('/updateInventory/:product_id', inventoryController.updateInventory); 
router.delete('/deleteInventory/:product_id', inventoryController.deleteInventory); 
router.post('/reserveStock/:product_id/reserve', inventoryController.reserveStock); 
router.post('/releaseStock/:product_id/release', inventoryController.releaseStock); 
router.get('/getLowStock/low-stock', inventoryController.getLowStock); 

module.exports = router;

