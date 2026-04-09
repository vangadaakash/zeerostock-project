const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required']
  },
  city: {
    type: String,
    required: [true, 'Supplier city is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
