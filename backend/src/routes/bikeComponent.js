'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const BikeComponentController = require('../controllers/bikeComponentController');

router.get('/', BikeComponentController.list);
router.get('/available/:tutorialId', BikeComponentController.listAvailable);
router.get('/unmapped', BikeComponentController.listUnmapped);
router.post('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeComponentController.create);
router.get('/:id', BikeComponentController.read);
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeComponentController.update);
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, BikeComponentController.remove);

module.exports = router;
