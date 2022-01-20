'use strict';

const BrandModel = require('../models/brand');

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
    // create brand in database
    let brand = await BrandModel.create(req.body);

    // return created brand
    return res.status(201).json(brand);
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
    // get brand with id from database
    let brand = await BrandModel.findById(req.params.id).exec();

    // if no brand with id is found, return 404
    if (!brand)
      return res.status(404).json({
        error: 'Not Found',
        message: 'brand not found',
      });

    // return gotten brand
    return res.status(200).json(brand);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const search = async (req, res) => {
  try {
    // get brand with id from database
    let brand = await BrandModel.find({$text: {$search: req.params.searchString}}).exec();

    // if no brand with id is found, return 404
    if (!brand)
      return res.status(404).json({
        error: 'Not Found',
        message: 'brand not found',
      });

    // return gotten brand
    return res.status(200).json(brand);
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
    // find and update brand with id
    let brand = await BrandModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    // return updated brand
    return res.status(200).json(brand);
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
    // find and remove brand
    await BrandModel.findByIdAndRemove(req.params.id).exec();

    // return message that brand was deleted
    return res
      .status(200)
      .json({ message: `brand with id${req.params.id} was deleted` });
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
    // get all brands in database
    let brands = await BrandModel.find({}).exec();

    // return gotten brands
    return res.status(200).json(brands);
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
  search,
};
