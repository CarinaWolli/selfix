'use strict';

const express = require('express');
const router = express.Router();

const TutorialTextStepController = require('../controllers/tutorialTextStepController');
const middlewares = require('../middlewares');

router.get('/', TutorialTextStepController.list);
router.get('/:id', TutorialTextStepController.read); // Read a tutorial step by Id
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, TutorialTextStepController.update); // Update a tutorial step by Id
router.put('/comments/:id', middlewares.checkAuthentication, TutorialTextStepController.updateComments); // Update comments of tutorial step by Id
router.delete('/:id',middlewares.checkAuthentication, middlewares.checkIsAdmin,  TutorialTextStepController.remove);

module.exports = router;
