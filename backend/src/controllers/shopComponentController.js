'use strict';

const ShopComponentModel = require('../models/shopcomponent');

const listPopulated = async (req, res) => {
  try {
    let shopComponents = await ShopComponentModel.find({ })
      .populate('bikeComponents')
      .exec();
    if (!shopComponents) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No shop components found',
      });
    }

    return res.status(201).json(shopComponents);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  // handle the request
  try {
    // create shop component in database
    req.body.creator = req.userId;
    let shopComponent = await ShopComponentModel.create(req.body);

    // return created shop component
    return res.status(201).json(shopComponent);
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
    // find and remove shop component
    await ShopComponentModel.findByIdAndRemove(req.params.id).exec();

    // return message that shop component was deleted
    return res.status(200).json({ message: `Shop component with id${req.params.id} was deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const listByBikeComponent = async (req, res) => {
  try {
    let shopComponents = await ShopComponentModel.find({ bikeComponents: req.params.bikeComponent })
      .populate('bikeComponents')
      .exec();

    // if no shop component with bike component is found, return 404
    if (!shopComponents) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No shop components found',
      });
    }

    // return gotten shop component
    return res.status(200).json(shopComponents);
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
    // find and update shop component with id
    req.body.lastEditor = req.userId;
    let shopComponent = await ShopComponentModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // return updated shop component
    return res.status(200).json(shopComponent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

module.exports = {
  listPopulated,
  create,
  remove,
  listByBikeComponent,
  update,
};
