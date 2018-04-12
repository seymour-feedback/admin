'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(config.mongodb_address);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'connection success:'));

module.exports = mongoose;
