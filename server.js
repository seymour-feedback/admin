'use strict';

var express = require('express'),
  routes = require('./routes'),
  router = express.Router(),
  messages = require('./messages'),
  messenger = require('./messenger'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  compression = require('compression'),
  path = require('path'),
  config = require('./config'),
  stylus = require('stylus'),
  nib = require('nib'),
  app = express(),
  server;

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app
  .disable('x-powered-by')
  .locals.basedir = path.join(__dirname, 'views/');

app
  .set('port', config.port)
  .set('ip', config.ip)
  .set('name', config.appName)
  .set('views', app.locals.basedir)
  .set('view engine', 'jade');

app
  .use(compression())
  .use(express.static(path.join(__dirname, '/dist')))
  .use(stylus.middleware({
    src: path.join(__dirname, '/src'),
    dest: path.join(__dirname, '/dist'),
    compile: compile
  }))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(methodOverride(('X-HTTP-Method-Override')))
  .use(session({ secret: config.sessionSecret, saveUninitialized: true, resave: true} ))
  .use(routes(router));

server = app.listen(app.get('port'), app.get('ip'), function() {
  console.log('Seymour Admin server listening on port %d', server.address().port);
});

//-----------------------------------------//

messenger(messages);

//----------------------------------------------------//


