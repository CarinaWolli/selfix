'use strict';

const express = require('express');
const router = express.Router();

const BikeCategoryController = require('../controllers/bikeCategoryController');

router.get('/', BikeCategoryController.list);

module.exports = router;
