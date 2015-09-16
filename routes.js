'use strict';

var admin = require('./controllers/admin'),
  auth = require('./controllers/auth');

module.exports = function (router) {

  return router
    .get('/', admin)
    .get('/login', auth.login.show)
    .post('/login', auth.login.create)
    .get('/logout', auth.logout)
    .get('/register', auth.register.show)
    .post('/register', auth.register.create)
    .get('/remove', auth.remove.show)
    .post('/remove', auth.remove.delete);

};

