'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const AffiliateController = require('../controllers/affiliateProductController');

router.get('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, AffiliateController.list);
router.get('/unmapped', middlewares.checkAuthentication, middlewares.checkIsAdmin, AffiliateController.getUnmapped);
router.get('/unmappedCount', middlewares.checkAuthentication, middlewares.checkIsAdmin, AffiliateController.getUnmappedCount);
router.post('/mapping', middlewares.checkAuthentication, middlewares.checkIsAdmin, AffiliateController.mapTo);

module.exports = router;