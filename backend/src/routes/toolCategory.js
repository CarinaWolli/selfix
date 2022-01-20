'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const ToolCategoryController = require('../controllers/toolCategoryController');

router.post('/', middlewares.checkAuthentication, middlewares.checkIsAdmin, ToolCategoryController.create);
router.get('/:id', ToolCategoryController.read);
router.get('/', ToolCategoryController.list);
router.delete('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, ToolCategoryController.remove);
router.put('/:id', middlewares.checkAuthentication, middlewares.checkIsAdmin, ToolCategoryController.update);

module.exports = router;
