'use strict';

var user = require('../../models').user;

module.exports = {

  template: 'remove',

  show: function (req, res) {
    res.render('remove');
  },

  delete: function (req, res) {
    user.remove(req.body).then(function () {
        req.session.isAuthenticated = false;
        return res.redirect('/register');
      }).catch(function (err) {
        res.status(403);
        if (req.xhr) {
          return res.json(err);
        }
        res.render('remove', {
          err: err
        });
      });
  }

};
