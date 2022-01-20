'use strict';

const UserModel = require('../models/user');

const getBookmarkBikes = async (req, res) => {
  try {
    let user = await UserModel.findById(req.userId);

    return res.status(200).json(user.bikeBookmarks);
  } catch(err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const bookmarkBike = async (req, res) => {
  try {
    await UserModel.updateOne({_id: req.userId},{ $addToSet: { bikeBookmarks: req.body.bikeId } });

    return res.status(200).json({success: 'True'});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const removeBookmarkBike = async (req, res) => {
  try {
    await UserModel.updateOne({_id: req.userId},{ $pullAll: { bikeBookmarks: [req.body.bikeId] } });

    return res.status(200).json({success: 'True'});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const getBookmarkTutorials = async (req, res) => {
  try {
    let user = await UserModel.findById(req.userId);

    return res.status(200).json(user.tutorialBookmarks);
  } catch(err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const bookmarkTutorial = async (req, res) => {
  try {
    await UserModel.updateOne({_id: req.userId},{ $addToSet: { tutorialBookmarks: req.body.tutorialBookmark } });

    return res.status(200).json({success: 'True'});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const removeBookmarkTutorial = async (req, res) => {
  try {
    await UserModel.updateOne({_id: req.userId},
      { $pull: {
        tutorialBookmarks: {
          ...req.body.tutorialBookmark
        }
      }});

    return res.status(200).json({success: 'True'});
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

module.exports = {
  getBookmarkBikes,
  bookmarkBike,
  removeBookmarkBike,
  getBookmarkTutorials,
  bookmarkTutorial,
  removeBookmarkTutorial
};
