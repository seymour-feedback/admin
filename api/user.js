'use strict';

var mongoose = require('./'),
  Schema = mongoose.Schema;

module.exports = mongoose.model('User', Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}));
