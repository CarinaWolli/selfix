'use strict';

const mongoose = require('mongoose');
const BikeComponentModel = require('../models/bikecomponent');

const opts = { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdatedDate' }, toJSON: { virtuals: true } };

// Define the bike schema
const ShopComponentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: { type: Number, default: 9.99 },
    shop: String,
    vendorId: String,
    affiliateLink: String,
    description: String,
    imageUrl: String,
    bikeComponents: [{ type: mongoose.Schema.Types.ObjectId, ref: BikeComponentModel }],
    creationDate: Date,
    lastUpdatedDate: Date,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    lastEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  opts
);

module.exports = mongoose.model('ShopComponent', ShopComponentSchema);
