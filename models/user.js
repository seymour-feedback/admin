'use strict';

var Promise = require('bluebird');
const User = require('../api/user');

const getMongoErrors = (err) => {
  var mongoErrors = {
    11000: {
      name: 'DuplicateKeyError'
    }
  };
  return mongoErrors[err.code];
};

module.exports = {

  login: function (details) {
    return new Promise(function (resolve, reject) {
      User.findOne(details, function (err, data) {
        if (err || !data) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  register: function (details) {
    return new Promise(function (resolve, reject) {
      var user = new User(details);
      user.save(function (err, data) {
        if (err) {
          if (err.name === 'MongoError') {
            err = errCode(err);
          }
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  remove: function (details) {
    return new Promise(function (resolve, reject) {
      User.remove({ username: details.username }, function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

};
