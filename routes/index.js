'use strict';

var auth = require('auth');

module.exports = {
  admin: require('./admin'),
  login: auth.login,
  register: auth.register,
  logout: auth.logout
};
