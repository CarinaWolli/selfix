'use strict';

const AffiliateProduct = require('../models/affiliateproduct');
const ShopComponent = require('../models/shopcomponent');
const ToolOption = require('../models/tooloption');

const list = async (req, res) => {
  try {
    let affiliates = await AffiliateProduct.find({}).exec();

    return res.status(200).json(affiliates);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const getUnmapped = async (req, res) => {
  try {
    let affiliates = await AffiliateProduct.find({ $or: [ {mapped: { $exists: false}}, {mapped: { $eq: false }}]}).exec();

    return res.status(200).json(affiliates);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const getUnmappedCount = async (req, res) => {
  try {
    let affiliates = await AffiliateProduct.find({ $or: [ {mapped: { $exists: false}}, {mapped: { $eq: false }}]}).exec();

    return res.status(200).json(affiliates.length);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const mapTo = async (req, res) => {
  try {
    if(req.body['affiliateProducts']) {
      if(req.body['bikeComponents']) {
        let affiliates = req.body['affiliateProducts'];
        let affiliateObjects = await AffiliateProduct.find({
          _id: {
            $in: affiliates
          }
        }).exec();
        let components = req.body['bikeComponents'];

        let shopComponents = affiliateObjects.map((affiliate) => {return {
          name: affiliate.name,
          price: affiliate.price,
          shop: affiliate.shop,
          affiliateLink: affiliate.affiliateLink,
          vendorId: affiliate.vendorId,
          description: affiliate.description,
          imageUrl: affiliate.imageUrl,
          bikeComponents: components,
          creator: req.userId,
          lastEditor: req.userId
        };});

        let result = await ShopComponent.insertMany(shopComponents);

        let updated = await AffiliateProduct.updateMany({
          _id: {
            $in: affiliates
          }
        },{
          $set:
          {
            mapped: true
          }
        });

        return res.status(201).json({
          affiliateProducts: updated,
          shopComponents: result
        });
      }
      if(req.body['toolCategories']) {

        let affiliates = req.body['affiliateProducts'];
        let affiliateObjects = await AffiliateProduct.find({
          _id: {
            $in: affiliates
          }
        }).exec();
        let toolCategory = req.body['toolCategories'];

        let toolOptions = affiliateObjects.map((affiliate) => {return {
          name: affiliate.name,
          price: affiliate.price,
          shop: affiliate.shop,
          affiliateLink: affiliate.affiliateLink,
          vendorId: affiliate.vendorId,
          description: affiliate.description,
          imageUrl: affiliate.imageUrl,
          toolCategory: toolCategory,
          creator: req.userId,
          lastEditor: req.userId
        };});

        let result = await ToolOption.insertMany(toolOptions);

        let updated = await AffiliateProduct.updateMany({
          _id: {
            $in: affiliates
          }
        },{
          $set:
          {
            mapped: true
          }
        });

        return res.status(201).json({
          affiliateProducts: updated,
          toolOptions: result
        });
      }
    }
    throw new Error('Missing properties in query!');
  }  catch(err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

module.exports = {
  list,
  mapTo,
  getUnmapped,
  getUnmappedCount
};
