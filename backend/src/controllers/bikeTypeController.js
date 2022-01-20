'use strict';

const BikeType = require('../models/biketype');

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  // handle the request
  try {
    req.body.creator = req.userId;
    // create bike type in database
    let bike = await BikeType.create(req.body);

    // return created bike type
    return res.status(201).json(bike);
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
    // get bike type with id from database
    let bike = await BikeType.findById(req.params.id).exec();

    // if no bike type with id is found, return 404
    if (!bike)
      return res.status(404).json({
        error: 'Not Found',
        message: 'Bike not found',
      });

    // return gotten bike type
    return res.status(200).json(bike);
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
    // find and update bike type with id
    let bike = await BikeType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // return updated bike type
    return res.status(200).json(bike);
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
    // find and remove bike type
    await BikeType.findByIdAndRemove(req.params.id).exec();

    // return message that bike type was deleted
    return res.status(200).json({ message: `Bike with id${req.params.id} was deleted` });
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
    // get all bike types in database
    let bikes = await BikeType.find({}).exec();

    // return gotten bike types
    return res.status(200).json(bikes);
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
