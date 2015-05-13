'use strict';

var user = require('../../models').user;

module.exports = {

  template: 'login',

  show: function (req, res) {
    res.render('login');
  },

  create: function (req, res) {
    user.login(req.body)
      .then(function (data) {
        req.session.user = data;
        req.session.isAuthenticated = true;
        res.redirect('/');
      })
      .catch(function (err) {
        var status = 403;
        if (!err) {
          status = 404;
          err = {
            name: 'AuthenticationError',
            message: 'No user could be found'
          };
        }
        res.status(status).render('login', {
          err: err
        });
      });
  }

};
