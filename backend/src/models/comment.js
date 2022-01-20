'use strict';
const mongoose = require('mongoose');
const opts = {toJSON: {virtuals: true}};

// Define the comment schema
const CommentSchema = new mongoose.Schema(
  {
    commentText: String,
    imageUrl: String,
    creationDate: Date,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  },
  opts
);

module.exports = mongoose.model('Comment', CommentSchema);
