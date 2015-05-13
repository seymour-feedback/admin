'use strict';

var mongoose = require('./'),
  Schema = mongoose.Schema;

module.exports = mongoose.model('Test', Schema({
  location: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: {
      unique: true
    }
  },
  type: {
    type: String
  }
}));
