'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models/user');

// Define schema for bikeType
const BikeTypeSchema = new mongoose.Schema({
  title: String,
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

module.exports = mongoose.model('Biketype', BikeTypeSchema);
