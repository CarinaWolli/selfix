'use strict';

const mongoose = require('mongoose');
const CommentModel = require('../models/comment');

const opts = {
  timestamps: {createdAt: 'creationDate', updatedAt: 'lastUpdatedDate'},
  toJSON: {virtuals: true}
};

// Define schema for TutorialVideoStep
const TutorialVideoStepSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    type: {
      type: String,
      default: 'video',
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


module.exports = mongoose.models.TutorialVideoStep || mongoose.model(
  'TutorialVideoStep', TutorialVideoStepSchema);
