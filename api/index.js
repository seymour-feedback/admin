'use strict';

var  config = require('../config'),
  mongoose = require('mongoose'),
  db = mongoose.connection;

mongoose.connect(config.creds.mongoUrl);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connection success:'));

module.exports = mongoose;
