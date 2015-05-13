'use strict';

var user = require('../../models').user;

module.exports = function (req, res) {
  req.session.isAuthenticated = false;
  return res.redirect('/login');
};
