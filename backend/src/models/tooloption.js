'use strict';

const mongoose = require('mongoose');
const ToolCategoryModel = require('../models/toolcategory');

const opts = { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdatedDate' }, toJSON: { virtuals: true } };

// Define the tool option schema
const ToolOptionSchema = new mongoose.Schema(
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
    toolCategory: { type: mongoose.Schema.Types.ObjectId, ref: ToolCategoryModel },
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

module.exports = mongoose.model('ToolOption', ToolOptionSchema);
