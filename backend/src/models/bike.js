'use strict';

const mongoose = require('mongoose');

const UserModel = require('../models/user');
const opts = { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdatedDate' }, toJSON: { virtuals: true } };


// Define the bike schema
const BikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: String,
    creationDate: Date,
    lastUpdatedDate: Date,
    bikeType: { type: mongoose.Schema.Types.ObjectId, ref: 'Biketype' },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BikeComponent' }],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel
    },
    lastEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel
    },
  },
  opts
);

module.exports = mongoose.model('Bike', BikeSchema);
