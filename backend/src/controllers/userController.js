'use strict';


const UserModel = require('../models/user');

const read = async (req, res) => {
  try {
    // get user with id from database
    let user = await UserModel.findById(req.params.id).exec();

    // if no user with id is found, return 404
    if (!user)
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });

    // return gotten user
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

module.exports = {
  read
};
