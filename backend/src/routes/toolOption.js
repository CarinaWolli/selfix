'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const ToolOptionController = require('../controllers/toolOptionController');

router.post('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, ToolOptionController.create);
router.get('/', ToolOptionController.list);
router.get('/:toolCategory', ToolOptionController.listByToolCategory);
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, ToolOptionController.remove);
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, ToolOptionController.update);

module.exports = router;
