'use strict';

const ToolOptionModel = require('../models/tooloption');

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  // handle the request
  try {
    // create tool option in database
    req.body.creator = req.userId;
    let toolOption = await ToolOptionModel.create(req.body);

    // return created tool option
    return res.status(201).json(toolOption);
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
    // find and remove tool option
    await ToolOptionModel.findByIdAndRemove(req.params.id).exec();

    // return message that tool option was deleted
    return res.status(200).json({ message: `Tool option with id${req.params.id} was deleted` });
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
    let toolOptions = await ToolOptionModel.find({})
      .populate('toolCategory')
      .exec();

    // if no tool options with tool category is found, return 404
    if (!toolOptions) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No tool options found',
      });
    }

    // return gotten tool options
    return res.status(200).json(toolOptions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const listByToolCategory = async (req, res) => {
  try {
    let toolOptions = await ToolOptionModel.find({ toolCategory: req.params.toolCategory })
      .populate('toolCategory')
      .exec();

    // if no tool options with tool category is found, return 404
    if (!toolOptions) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No tool options found',
      });
    }

    // return gotten tool options
    return res.status(200).json(toolOptions);
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
    // find and update tool option with id
    req.body.lastEditor = req.userId;
    let toolOption = await ToolOptionModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // return updated tool option
    return res.status(200).json(toolOption);
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
  remove,
  list,
  listByToolCategory,
  update,
};
