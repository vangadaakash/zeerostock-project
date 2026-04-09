const express = require('express');
const router = express.Router();
const { createInventory, getInventory, searchInventory } = require('../controllers/inventoryController');

router.post('/inventory', createInventory);
router.get('/inventory', getInventory);
router.get('/search', searchInventory);

module.exports = router;
