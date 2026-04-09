const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If no URI is provided, spin up an in-memory MongoDB server for testing!
    if (!uri) {
      console.log('No MONGO_URI provided. Starting in-memory MongoDB server for local development...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      process.env.MONGO_URI = uri; // Set it so other parts of the app can use it if needed
    }

    const conn = await mongoose.connect(uri);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Automatically seed it with mock data if it's empty
    await seedDatabase();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  const Supplier = require('../models/Supplier');
  const Inventory = require('../models/Inventory');
  
  const supplierCount = await Supplier.countDocuments();
  if (supplierCount === 0) {
    console.log('Seeding in-memory database with initial data...');
    
    const suppliers = await Supplier.insertMany([
      { name: 'Global Office', city: 'New York' },
      { name: 'Tech Solutions Inc.', city: 'San Francisco' },
      { name: 'Everyday Stationery', city: 'Chicago' }
    ]);

    await Inventory.insertMany([
      { supplier_id: suppliers[0]._id, productName: 'Ergonomic Chair', category: 'Furniture', quantity: 50, price: 199.99 },
      { supplier_id: suppliers[0]._id, productName: 'Standing Desk', category: 'Furniture', quantity: 20, price: 399.50 },
      { supplier_id: suppliers[1]._id, productName: 'Wireless Mouse', category: 'Electronics', quantity: 150, price: 29.99 },
      { supplier_id: suppliers[1]._id, productName: 'Mechanical Keyboard', category: 'Electronics', quantity: 75, price: 89.99 },
      { supplier_id: suppliers[1]._id, productName: 'Noise Cancelling Headphones', category: 'Electronics', quantity: 40, price: 199.00 },
      { supplier_id: suppliers[2]._id, productName: 'Premium Notebooks 5-Pack', category: 'Stationery', quantity: 200, price: 15.00 },
      { supplier_id: suppliers[2]._id, productName: 'Gel Pens Set', category: 'Stationery', quantity: 300, price: 8.50 },
      { supplier_id: suppliers[0]._id, productName: 'Office Lounge Sofa', category: 'Furniture', quantity: 5, price: 899.00 },
      { supplier_id: suppliers[1]._id, productName: '4K IPS Monitor', category: 'Electronics', quantity: 30, price: 299.99 },
      { supplier_id: suppliers[2]._id, productName: 'Whiteboard Planners', category: 'Stationery', quantity: 80, price: 22.00 }
    ]);
    
    console.log('Database seeded successfully!');
  }
};

module.exports = connectDB;
