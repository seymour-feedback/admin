'use strict';

module.exports = function (req, res) {

  if (req.session.isAuthenticated) {
    return res.render('index', {
      username: req.session.user.username,
      url: req.session.user.url
    });
  }
  res.redirect('/login');

};

