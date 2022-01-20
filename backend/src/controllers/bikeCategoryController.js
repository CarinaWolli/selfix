'use strict';
const BikeType = require('../models/biketype');
const Bike = require('../models/bike');
const Brand = require('../models/brand');
const BikeCategory = require('../models/bikecategory');

const list = async (req, res) => {
  try {
    // get all bike types in database
    const biketypes = await BikeType.find({}).exec();
    const categories = [];
    for (const bikeType of biketypes) {
      const bikeCategory = new BikeCategory(bikeType._id, bikeType.title, bikeType.imageUrl);
      const bikes = await Bike.find({bikeType: bikeType._id}).exec();
      const brandSet = new Set();
      const categoryChildren = [];
      for (const bike of bikes) {
        const brand = await Brand.findById(bike.brand).exec();
        const exists = [...brandSet].map(b => b._id.toHexString()).includes(
          brand._id.toHexString());
        if (!exists) {
          brandSet.add(brand);
          categoryChildren.push(new BikeCategory(brand._id, brand.name, brand.imageUrl));
        }
      }
      bikeCategory.children = categoryChildren;
      categories.push(bikeCategory);
    }
    // return bike categories as dto objects
    return res.status(200).json(categories);
  } catch
  (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
}
;

module.exports = {
  list,
};
