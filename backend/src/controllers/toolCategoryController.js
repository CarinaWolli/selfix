'use strict';

const ToolCategoryModel = require('../models/toolcategory');

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  // handle the request
  try {
    // create tool category in database
    let toolCategory = await ToolCategoryModel.create(req.body);

    // return created bike type
    return res.status(201).json(toolCategory);
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
    // get tool category with id from database
    let toolCategory = await ToolCategoryModel.findById(req.params.id).exec();

    // if no tool category with id is found, return 404
    if (!toolCategory)
      return res.status(404).json({
        error: 'Not Found',
        message: 'Tool Category not found',
      });

    // return gotten tool category
    return res.status(200).json(toolCategory);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    // get all tool categories in database
    let toolCategories = await ToolCategoryModel.find({}).exec();

    // return gotten tool categories
    return res.status(200).json(toolCategories);
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
    // find and remove tutorial
    await ToolCategoryModel.findByIdAndRemove(req.params.id).exec();

    // return message that tutorial was deleted
    return res.status(200).json({ message: `Tool Category with id${req.params.id} was deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
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
    // find and update tool category with id
    let toolCategory = await ToolCategoryModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // return updated tool category
    return res.status(200).json(toolCategory);
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
  list,
  update,
  remove,
};
