'use strict';

const mongoose = require('mongoose');
const CommentModel = require('../models/comment');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  // role of the user, used for rights management
  role: {
    type: String,
    // role can only take the value "member" and "admin"
    enum: ['member', 'admin'],
    // if not specified the role member is choosen
    default: 'member',
  },
  bikeBookmarks: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bike'}],
    default: []
  },
  tutorialBookmarks: {
    type: [{
      tutorialId: {type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial'},
      componentId: {type: mongoose.Schema.Types.ObjectId, ref: 'BikeComponent'}
    }],
    default: []
  }
});

UserSchema.set('versionKey', false);

UserSchema.pre('remove', function (next) {
  const user = this;
  const query = {userId: user._id};
  CommentModel.find(query).deleteMany().exec();

  next();
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
