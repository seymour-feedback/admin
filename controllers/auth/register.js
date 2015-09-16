'use strict';

var user = require('../../models').user;

module.exports = {

  template: 'register',

  show: function (req, res) {
    res.render('register');
  },

  create: function (req, res) {
    user.register(req.body)
      .then(function () {
        req.session.user = req.body;
        req.session.isAuthenticated = true;
        return res.redirect('/');
      })
      .catch(function (err) {
        res.status(403);
        if (req.xhr) {
          return res.json(err);
        }
        res.render('register', {
          err: err
        });
      });
  }

};
