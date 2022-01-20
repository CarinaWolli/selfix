'use strict';

const mongoose = require('mongoose');
const CommentModel = require('../models/comment');

const opts = {
  timestamps: {
    createdAt: 'creationDate',
    updatedAt: 'lastUpdatedDate'
  }, toJSON: {virtuals: true}
};

// Define schema for TutorialTextStep
const TutorialTextStepSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: {
      type: String,
      default: 'text',
    },
    mediaUrl: String,
    position: Number,
    creationDate: Date,
    lastUpdatedDate: Date,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: CommentModel}],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lastEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  opts
);

module.exports = mongoose.models.TutorialTextStep
  || mongoose.model(
    'TutorialTextStep', TutorialTextStepSchema);

