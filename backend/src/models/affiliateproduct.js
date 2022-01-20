'use strict';

const mongoose = require('mongoose');

const opts = { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdatedDate' }, toJSON: { virtuals: true } };

// Define the bike schema
const AffiliateProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: Number,
    shop: String,
    vendorId: String,
    affiliateLink: String,
    description: String,
    imageUrl: String,
    mapped: {
      type: Boolean,
      default: false,
    },
    creationDate: Date,
    lastUpdatedDate: Date,
  },
  opts
);

module.exports = mongoose.model('AffiliateProduct', AffiliateProductSchema);
