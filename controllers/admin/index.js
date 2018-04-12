'use strict';

const parse = require('url').parse;

module.exports = function (req, res) {

  if (req.session.isAuthenticated) {
    const parts = parse(req.session.user.url);
    const protocol = parts.protocol;
    const url = (protocol && protocol !== 'localhost:') ? parts.href : `http://${parts.href}`;
    return res.render('index', {
      username: req.session.user.username,
      url: url
    });
  }
  res.redirect('/login');

};

