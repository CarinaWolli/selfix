'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models/user');

const TutorialModel = require('../models/tutorial');

const opts = { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdatedDate' }, toJSON: { virtuals: true } };

// Define the bike component schema
const BikeComponentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    componentPart: {
      type: String,
      enum: ['FrontWheel', 'BackWheel', 'Frame', 'Cockpit', 'Saddle', 'Drivetrain', 'Pedals', 'Misc'],
      default: 'Misc',
    },
    tutorial: { type: mongoose.Schema.Types.ObjectId, ref: TutorialModel },
    creationDate: Date,
    lastUpdatedDate: Date,
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

module.exports = mongoose.model('BikeComponent', BikeComponentSchema);
