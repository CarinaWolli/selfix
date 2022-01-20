'use strict';

const express = require('express');
const router = express.Router();

const TutorialVideoStepController = require(
  '../controllers/tutorialVideoStepController');
const middlewares = require('../middlewares');

router.get('/:id', TutorialVideoStepController.read); // Read a tutorial step by Id
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialVideoStepController.update); // Update a tutorial step by Id
router.put('/comments/:id', middlewares.checkAuthentication, TutorialVideoStepController.updateComments); // Update comments of tutorial step by Id
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialVideoStepController.remove);
router.get('/', TutorialVideoStepController.list);

module.exports = router;
