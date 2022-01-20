'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/:id', UserController.read); // get user by id

module.exports = router;
