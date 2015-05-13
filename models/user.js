'use strict';

var Promise = require('bluebird'),
  User = require('../api/user');

function getAuthErrors(details) {
  var authErrors = {
    errors: {
      username: {
        message: 'username is required',
        path: 'username',
        type: 'required'
      },
      password: {
        message: 'password is required',
        path: 'password',
        type: 'required'
      }
    }
  };
  return Object.keys(details).map(function (name) {
    if (!details[name]) {
      return authErrors.errors[name];
    }
  });
}

function getMongoErrors(code) {
  var mongoErrors = {
    11000: {
      message: 'Key already exists',
      name: 'DuplicateKeyError'
    }
  };
  return mongoErrors[code];
}

module.exports = {

  login: function (details) {
    return new Promise(function (resolve, reject) {
      if (!details.username || !details.password) {
        var err = getAuthErrors(details);
        return reject(err);
      }
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
            err = getMongoErrors(err.code);
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
