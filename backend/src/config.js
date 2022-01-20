'use strict';

// Configuration variables
const port = process.env.PORT || '4000';
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27037/selfix';
const JwtSecret = process.env.JWT_SECRET || 'very secret secret';

module.exports = {
  port,
  mongoURI,
  JwtSecret,
};
