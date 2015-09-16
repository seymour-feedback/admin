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
      },
      url: {
        message: 'url is required',
        path: 'url',
        type: 'required'
      }
    }
  };
  Object.keys(details).forEach(function (name) {
      details[name] = authErrors.errors[name];
  });
  return details;
}

function getMongoErrors(error) {
  var mongoErrors = {
    11000: {
      message: 'Key already exists',
      name: 'DuplicateKeyError'
    }
  };
  return mongoErrors[error.code];
}

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
      user.save(function (error, data) {
        if (error) {
          if (error.name === 'MongoError') {
            error = getMongoErrors.call(user, error);
          } else {
            error.errors = getAuthErrors(error.errors);
          }
          return reject(error);
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
