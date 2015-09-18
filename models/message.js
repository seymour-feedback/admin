'use strict';

var Promise = require('bluebird'),
  Message = require('../api/message');

module.exports = {

  create: function (details) {

    details.date = Date.now();

    return new Promise(function (resolve, reject) {
      var message = new Message(details);
      message.save(function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },

  read: function (id) {
    return new Promise(function (resolve, reject) {
      if (id) {
        Message.find({ _id: id }, function (err, data) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      } else {
        Message.find(function (err, data) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      }
    });
  },

  delete: function (id) {
    return new Promise(function (resolve, reject) {
      if (id) {
        Message.remove({ _id: id }, function (err, data) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      }
    });
  }

};
