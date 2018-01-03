'use strict';

module.exports = function (req, res) {

  if (req.session.isAuthenticated) {
    console.log(res.locals)
    return res.render('index', {
      username: req.session.user.username,
      url: req.session.user.url
    });
  }
  res.redirect('/login');

};

