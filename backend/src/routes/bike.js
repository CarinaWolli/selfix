'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const BikeController = require('../controllers/bikeController');

router.get('/', BikeController.list); // List all bikes
router.get('/populated', BikeController.listPopulated);
router.post('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeController.create); // Create a new bike, needs logged in user with the admin role
router.get('/:id', BikeController.read); // Read a bike by Id
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeController.update); // Update a bike by Id, needs logged in user with the admin role
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeController.remove); // Delete a bike by Id, needs logged in user with the admin role
router.get('/search/:searchString', BikeController.search); // Search for a bike
router.get('/categorySearch/:bikeType/:brand', BikeController.categorySearch); // Search for a bike
router.delete('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeController.deleteMany);

module.exports = router;
