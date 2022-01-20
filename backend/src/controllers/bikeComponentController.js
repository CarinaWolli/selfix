'use strict';

const BikeComponent = require('../models/bikecomponent');

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  // handle the request
  try {
    // create bike component in database
    req.body.creator = req.userId;
    let bikeComponent = await BikeComponent.create(req.body);

    // return created bike component
    return res.status(201).json(bikeComponent);
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
    // get bike component with id from database
    let bikeComponent = await BikeComponent.findById(req.params.id).exec();

    // if no bike component with id is found, return 404
    if (!bikeComponent)
      return res.status(404).json({
        error: 'Not Found',
        message: 'Bike not found',
      });

    // return gotten bike component
    return res.status(200).json(bikeComponent);
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
    // find and update bike component with id
    let bikeComponent = await BikeComponent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // return updated bike component
    return res.status(200).json(bikeComponent);
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
    // find and remove bike component
    await BikeComponent.findByIdAndRemove(req.params.id).exec();

    // return message that bike component was deleted
    return res.status(200).json({ message: `Bike component with id${req.params.id} was deleted` });
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
    let components = await BikeComponent.find({}).exec();

    return res.status(200).json(components);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const listAvailable = async (req, res) => {
  try {
    let components = await BikeComponent.find({
      $or: [{ tutorial: null }, { tutorial: req.params.tutorialId }],
    }).exec();

    return res.status(200).json(components);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const listUnmapped = async (req, res) => {
  try {
    let components = await BikeComponent.find({ tutorial: null }).exec();

    return res.status(200).json(components);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

module.exports = {
  list,
  listAvailable,
  listUnmapped,
  create,
  remove,
  update,
  read,
};
