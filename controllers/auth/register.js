'use strict';

var user = require('../../models').user;

const username = 'That username is already taken, please choose another';
const errMessages = (details) => {
  const authErrors = {
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
  Object.keys(details).forEach(name => {
      details[name] = authErrors.errors[name];
  });
  return details;
};

module.exports = {

  template: 'register',

  show: (req, res) => {
    res.render('register');
  },

  create: (req, res) => {
    user.register(req.body)
      .then(() => {
        req.session.user = req.body;
        req.session.isAuthenticated = true;
        return res.redirect('/');
      })
      .catch(err => {
        if (err.name === 'DuplicateKeyError') {
          err.message = username;
        } else if (err.errors) {
          err.errors = errMessages(err.errors);
        }
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
