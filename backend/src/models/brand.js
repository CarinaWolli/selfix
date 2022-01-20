'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models/user');

// Define schema for Brands
const BrandSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel
  },
  lastEditor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel
  },
});

module.exports = mongoose.model('Brand', BrandSchema);
