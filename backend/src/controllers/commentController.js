'use strict';

const CommentModel = require('../models/comment');
const TutorialTextStepModel = require('../models/tutorialtextstep');
const TutorialVideoStepModel = require('../models/tutorialvideostep');

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  }

  // handle the request
  try {
    // create comment in database
    let comment = await CommentModel.create(req.body);

    // return created comment
    return res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const read = async (req, res) => {
  try {
    // get comment with id from database
    let comment = await CommentModel.findById(req.params.id).exec();

    // if no comment with id is found, return 404
    if (!comment) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Comment not found',
      });
    }

    // return gotten comment
    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  }

  // handle the request
  try {
    // find and update comment with id
    let comment = await CommentModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true,
      }).exec();

    // return updated comment
    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    // find and remove comment
    await CommentModel.findByIdAndRemove(req.params.id, function (err, doc) {
      if (err) {
        console.log(err);
      }
      if (!doc) {
        console.log('Doc not found');
      } else {
        TutorialTextStepModel.find(
          {comments: {'$in': [doc._id]}}).then(function (steps) {
          if (steps) {
            steps.forEach(step => {
              const pos = step.comments.map(c => c._id).indexOf(doc._id);
              step.comments.splice(pos, 1);
              TutorialTextStepModel.updateOne(step);
            });
          }
        });

        TutorialVideoStepModel.find(
          {comments: {'$in': [doc._id]}}).then(function (steps) {
          if (steps) {
            steps.forEach(step => {
              const pos = step.comments.map(c => c._id).indexOf(doc._id);
              step.comments.splice(pos, 1);
              TutorialVideoStepModel.updateOne(step);
            });
          }
        });

      }
    }).catch((e) => console.log(e));

    // return message that comment was deleted
    return res.status(200).json(
      {message: `Comment with id${req.params.id} was deleted`});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    // get all comments in database
    let comments = await CommentModel.find({}).exec();

    // return gotten comments
    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  list,
};
 