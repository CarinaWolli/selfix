'use strict';

const mongoose = require('mongoose');

// Define schema for ToolCategory
const ToolCategorySchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

module.exports = mongoose.model('ToolCategory', ToolCategorySchema);
