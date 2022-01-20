'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const TutorialController = require('../controllers/tutorialController');

router.post('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialController.create); // Create a new tutorial, needs logged in user with the admin role
router.get('/:id', TutorialController.read); // Read a tutorial by Id
router.get('/tools/:id', TutorialController.readWithToolOptions); // Read a tutorial by Id including the tool options
router.get('/bikecomponents/:id', TutorialController.readWithBikeComponents); // Read a tutorial by Id including bike components
router.get('/', TutorialController.list); // List all tutorials
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialController.remove); // Delete a tutorial by Id, needs logged in user with the admin role
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialController.update); // Update a tutorial by Id, needs logged in user with the admin role
router.delete('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialController.deleteMany);

module.exports = router;
