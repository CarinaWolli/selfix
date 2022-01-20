'use strict';

const mongoose = require('mongoose');
const UserModel = require('../models/user');
const ToolCategoryModel = require('../models/toolcategory');

const opts = {
  timestamps: {
    createdAt: 'creationDate',
    updatedAt: 'lastUpdatedDate',
  },
  toJSON: { virtuals: true },
};

// Define the tutorial schema
const TutorialSchema = new mongoose.Schema(
  {
    videoSteps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TutorialVideoStep',
      },
    ],
    textSteps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TutorialTextStep',
      },
    ],
    toolCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ToolCategoryModel,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: String,
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    timeRequired: {
      type: Number,
      default: 30,
    },
    creationDate: Date,
    lastUpdatedDate: Date,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
    lastEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
    toolOptions: {},
    bikeComponents: [],
  },
  opts
);

TutorialSchema.virtual('steps').get(function() {
  const steps = this.videoSteps.concat(this.textSteps);
  steps.sort(function(a, b) {
    return a.position - b.position;
  });
  return steps;
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
