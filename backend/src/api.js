'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const middlewares = require('./middlewares');

const auth = require('./routes/auth');
const movie = require('./routes/movie');
const bike = require('./routes/bike');
const tutorial = require('./routes/tutorial');
const tutorialTextStep = require('./routes/tutorialTextStep');
const tutorialVideoStep = require('./routes/tutorialVideoStep');
const bikeType = require('./routes/biketype');
const bikeCategory = require('./routes/bikeCategory');
const comment = require('./routes/comment');
const bikeComponent = require('./routes/bikeComponent');
const shopComponent = require('./routes/shopComponent');
const toolCategory = require('./routes/toolCategory');
const toolOption = require('./routes/toolOption');
const brand = require('./routes/brand');
const affiliates = require('./routes/affiliateProduct');

const bookmarks = require('./routes/bookmarks');
const user = require('./routes/user');

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get('/', (req, res) => {
  res.json({
    name: 'SEBA Master Movie Backend',
  });
});

// API routes
api.use('/auth', auth);
api.use('/movies', movie);
api.use('/bikes', bike);
api.use('/tutorialTextSteps', tutorialTextStep);
api.use('/tutorialVideoSteps', tutorialVideoStep);
api.use('/tutorials', tutorial);
api.use('/biketypes', bikeType);
api.use('/bikeCategories', bikeCategory);
api.use('/comments', comment);
api.use('/bikeComponents', bikeComponent);
api.use('/shopComponents', shopComponent);
api.use('/toolCategories', toolCategory);
api.use('/toolOptions', toolOption);
api.use('/bookmark', bookmarks);
api.use('/users', user);
api.use('/brand',brand);
api.use('/affiliateproducts',affiliates);

module.exports = api;
