'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const BikeTypeController = require('../controllers/bikeTypeController');

router.get('/', BikeTypeController.list);
router.post(
  '/',
  middlewares.checkAuthentication,
  middlewares.checkIsAdmin,
  BikeTypeController.create
); // Create a new bike type, needs logged in user with the admin role
router.get('/:id', BikeTypeController.read); // Read a bike type by Id
router.put(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkIsAdmin,
  BikeTypeController.update
); // Update a bike type by Id, needs logged in user with the admin role
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkIsAdmin,
  BikeTypeController.remove
); // Delete a bike type by Id, needs logged in user with the admin role

module.exports = router;
