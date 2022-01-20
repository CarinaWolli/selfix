'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const BrandController = require('../controllers/brandController');

router.get('/', BrandController.list);
router.post(
  '/',
  middlewares.checkAuthentication,
  middlewares.checkIsAdmin,
  BrandController.create
); // Create a new brand, needs logged in user with the admin role
router.get('/:id', BrandController.read); // Read a brand by Id
router.put(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkIsAdmin,
  BrandController.update
); // Update a brand by Id, needs logged in user with the admin role
router.delete(
  '/:id',
  middlewares.checkAuthentication,
  middlewares.checkIsAdmin,
  BrandController.remove
); // Delete a brand by Id, needs logged in user with the admin role

module.exports = router;
