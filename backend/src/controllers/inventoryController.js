const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');

// POST /inventory
const createInventory = async (req, res) => {
  try {
    const { supplier_id, productName, category, quantity, price } = req.body;

    // Validate supplier existence
    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ message: 'Invalid supplier_id' });
    }

    // Validate quantity and price
    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity must be 0 or more' });
    }
    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be greater than 0' });
    }

    const newInventory = new Inventory({
      supplier_id,
      productName,
      category,
      quantity,
      price
    });
    
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory', error: error.message });
  }
};

// GET /inventory
// Returns all inventory grouped by supplier and sorted by total inventory value (quantity * price)
const getInventory = async (req, res) => {
  try {
    const groupedInventory = await Inventory.aggregate([
      {
        $lookup: {
          from: 'suppliers', // Mongoose usually pluralizes models to lowercase collections
          localField: 'supplier_id',
          foreignField: '_id',
          as: 'supplierInfo'
        }
      },
      { $unwind: '$supplierInfo' },
      {
        $group: {
          _id: '$supplierInfo._id',
          supplierName: { $first: '$supplierInfo.name' },
          total_inventory_value: { $sum: { $multiply: ['$quantity', '$price'] } },
          items: {
            $push: {
              productName: '$productName',
              category: '$category',
              quantity: '$quantity',
              price: '$price'
            }
          }
        }
      },
      { $sort: { total_inventory_value: -1 } }
    ]);
    
    res.status(200).json(groupedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// GET /search (Assignment A requirements)
const searchInventory = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (q) {
      // Case-insensitive regex search
      query.productName = { $regex: q, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        if (Number(minPrice) < 0) return res.status(400).json({ message: 'minPrice must be >= 0' });
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        if (minPrice && Number(minPrice) > Number(maxPrice)) {
          return res.status(400).json({ message: 'Minimum price cannot be higher than maximum.' });
        }
        query.price.$lte = Number(maxPrice);
      }
    }

    const results = await Inventory.find(query).populate('supplier_id', 'name');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching inventory', error: error.message });
  }
};

module.exports = {
  createInventory,
  getInventory,
  searchInventory
};
