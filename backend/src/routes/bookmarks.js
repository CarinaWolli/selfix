'use strict';

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const BookmarkController = require('../controllers/bookmarkController');

router.get('/bookmarkBike', middlewares.checkAuthentication, BookmarkController.getBookmarkBikes);
router.put('/bookmarkBike', middlewares.checkAuthentication, BookmarkController.bookmarkBike);
router.put('/removeBookmarkBike', middlewares.checkAuthentication, BookmarkController.removeBookmarkBike);

router.get('/bookmarkTutorial', middlewares.checkAuthentication, BookmarkController.getBookmarkTutorials);
router.put('/bookmarkTutorial', middlewares.checkAuthentication, BookmarkController.bookmarkTutorial);
router.put('/removeBookmarkTutorial', middlewares.checkAuthentication, BookmarkController.removeBookmarkTutorial);

module.exports = router;
