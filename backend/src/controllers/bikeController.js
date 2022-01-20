'use strict';
const BikeModel = require('../models/bike');
const TutorialModel = require('../models/tutorial');
const UserModel = require('../models/user');

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
    req.body.creator = req.userId;
    // create bike in database
    let bike = await BikeModel.create(req.body);


    // return created bike
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
    // get bike with id from database
    let bike = await BikeModel.findById(req.params.id)
      .populate('brand', 'name')
      .populate('bikeType', 'title')
      .populate({
        path: 'components',
        populate: {
          path: 'tutorial',
          model: TutorialModel
        }
      })
      .exec();

    // if no bike with id is found, return 404
    if (!bike) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Bike not found',
      });
    }

    // return gotten bike
    return res.status(200).json(bike);
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
    // get bike with searchstring from database

    let bikes = await BikeModel.find({
      $or: [
        {
          name: {$regex: req.params.searchString, $options: 'i'},
        },
        {
          description: {$regex: req.params.searchString, $options: 'i'},
        },
        {
          'brand.name': {$regex: req.params.searchString, $options: 'i'},
        },
        {
          'bikeType.title': {$regex: req.params.searchString, $options: 'i'},
        },
      ],
    }).exec();

    // if no bike with id is found, return 404
    if (!bikes) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Bike not found',
      });
    }

    // return gotten bike
    return res.status(200).json(bikes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const categorySearch = async (req, res) => {
  try {
    let bikes;
    if (req.params.brand === '0') {
      bikes = await BikeModel.find({bikeType: req.params.bikeType})
        .populate('brand')
        .populate('bikeType')
        .exec();
    } else {
      bikes = await BikeModel.find(
        {bikeType: req.params.bikeType, brand: req.params.brand})
        .populate('brand')
        .populate('bikeType')
        .exec();
    }
    // if no bike with bikeType and brand is found, return 404
    if (!bikes) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Bike not found',
      });
    }

    // return gotten bike
    return res.status(200).json(bikes);
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
    // find and update bike with id
    req.body.lastEditor = req.userId;
    let bike = await BikeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    // return updated bike
    return res.status(200).json(bike);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const removeOne = async (id) => {
  await BikeModel.findByIdAndRemove(id, { useFindAndModify: false }, function(err,doc) {
    if (err) {
      console.log(err);
    }
    if (!doc) {
      console.log('Doc not found');
    } else {
      UserModel.updateMany({},{ $pullAll: { bikeBookmarks: [id]}}).exec();
    }
  }).exec();
};

const remove = async (req, res) => {
  try {
    await removeOne(req.params.id);

    return res.status(200).json(
      {message: `Bike with id${req.params.id} was deleted`});
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const deleteMany = (req, res) => {
  let deletedIds = [];
  req.body.bikeIds.forEach(async (id) => {
    try{
      await removeOne(id);
      deletedIds.push(id);
    } catch(err) {
      console.log('Failed to delete a bike');
    }
  });
  return res.status(200).json({
    deletedIds
  });
};

const list = async (req, res) => {
  try {
    // get all bikes in database
    let bikes = await BikeModel.find({}).exec();

    // return gotten bikes
    return res.status(200).json(bikes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const listPopulated = async (req, res) => {
  try {
    // get all bikes in database
    let bikes = await BikeModel.find({})
      .populate('brand', 'name')
      .populate('bikeType', 'title')
      .exec();

    // return gotten bikes
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
  listPopulated,
  search,
  categorySearch,
  deleteMany,
};
