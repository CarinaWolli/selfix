'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const ShopComponentController = require('../controllers/shopComponentController');

router.get('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, ShopComponentController.listPopulated);
router.post('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, ShopComponentController.create);
router.get('/:bikeComponent', ShopComponentController.listByBikeComponent);
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, ShopComponentController.remove);
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, ShopComponentController.update);

module.exports = router;
