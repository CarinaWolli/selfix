'use strict';

const CommentModel = require('../models/comment');
const TutorialTextStepModel = require('../models/tutorialtextstep');
const TutorialModel = require('../models/tutorial');

const read = async (req, res) => {
  try {
    // get tutorial step with id from database
    let tutorialTextStep = await TutorialTextStepModel.findById(req.params.id);

    // get referenced tutorial steps
    await tutorialTextStep.populate(
      {path: 'comments', model: CommentModel}).execPopulate();

    // if no tutorial step with id is found, return 404
    if (!tutorialTextStep) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'not found',
      });
    }

    // return gotten tutorial
    return res.status(200).json(tutorialTextStep);
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
    req.body.lastEditor = req.userId;
    // find and update tutorial step with id
    let tutorialTextStep = await TutorialTextStepModel.findByIdAndUpdate(
      req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).exec();

    // return updated step
    return res.status(200).json(tutorialTextStep);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const updateComments = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  }

  try {
    // find and update tutorial step with id
    let tutorialTextStep = await TutorialTextStepModel.findByIdAndUpdate(
      req.params.id, {$set: {'comments' : req.body.tutorialTextStep.comments}}, {
        new: true,
        runValidators: true,
      }).exec();

    // return step with updated comments
    return res.status(200).json(tutorialTextStep);
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
    // find and remove tutorial text step
    await TutorialTextStepModel.findByIdAndDelete(req.params.id,
      function (err, doc) {
        if (err) {
          console.log(err);
        }
        if (!doc) {
          console.log('Doc not found');
        } else {
          TutorialModel.find(
            {textSteps: {'$in': [doc._id]}}).then(function (steps) {
            if (steps) {
              steps.forEach(step => {
                const pos = step.videoSteps.map(c => c._id).indexOf(doc._id);
                step.videoSteps.splice(pos, 1);
                TutorialModel.updateOne(step);
              });
            }
          }).catch(err => console.log(err));

          if (doc.comments !== undefined) {
            doc.comments.forEach((commentsId) => {
              console.log('Deleting comment ' + commentsId);
              CommentModel.findByIdAndRemove(commentsId);
            });
          }
        }
      }).catch((e) => console.log(e));

    // return message that text step was deleted
    return res.status(200).json(
      {message: `Text step with id${req.params.id} was deleted`});
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
    // get all text steps in database
    let movies = await TutorialTextStepModel.find({}).exec();

    // return gotten text steps
    return res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

module.exports = {
  read,
  update,
  list,
  remove, 
  updateComments
};
