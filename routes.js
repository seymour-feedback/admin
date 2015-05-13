'use strict';

var admin = require('./routes/admin'),
  auth = require('./routes/auth');

module.exports = function (router) {

  return router
    .get('/', admin)
    .get('/login', auth.login.show)
    .post('/login', auth.login.create)
    .get('/logout', auth.logout)
    .get('/register', auth.register.show)
    .post('/register', auth.register.create);

};

