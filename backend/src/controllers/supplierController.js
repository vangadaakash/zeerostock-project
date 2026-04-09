const Supplier = require('../models/Supplier');

// POST /supplier
const createSupplier = async (req, res) => {
  try {
    const { name, city } = req.body;
    if (!name || !city) {
      return res.status(400).json({ message: 'Name and city are required' });
    }

    const newSupplier = new Supplier({ name, city });
    await newSupplier.save();

    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Error creating supplier', error: error.message });
  }
};

module.exports = {
  createSupplier
};
