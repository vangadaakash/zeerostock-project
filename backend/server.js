require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const supplierRoutes = require('./src/routes/supplierRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');

app.use('/supplier', supplierRoutes);
app.use('/', inventoryRoutes); // /inventory and /search

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
