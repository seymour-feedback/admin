'use strict';

var user = require('../../models').user;

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

module.exports = {

  show: function (req, res) {
    res.render('login');
  },

  create: function (req, res) {

    if (!req.body.username || !req.body.password) {
      var err = {
        message: 'Username or password is not correct',
        errors: getAuthErrors(req.body)
      };
      return res.status(403).render('login', {
        err: err
      });
    }

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
