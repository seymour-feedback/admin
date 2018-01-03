'use strict';

const express = require('express');
const routes = require('./routes');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const compression = require('compression');
const path = require('path');
const config = require('./config');
const stylus = require('stylus');
const nib = require('nib');
const app = express();

const morgan = require('morgan');
app.use(morgan('combined'))

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.disable('x-powered-by')
app.locals.basedir = path.join(__dirname, 'views/');

app.set('port', config.port)
app.set('views', app.locals.basedir)
app.set('view engine', 'jade');

app.use(compression())
app.use(stylus.middleware({
  src: path.join(__dirname, '/src'),
  dest: path.join(__dirname, '/dist'),
  compile: compile
}));
app.use(express.static(path.join(__dirname, '/dist')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride(('X-HTTP-Method-Override')))
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true
}));
app.use(routes(router));

const server = app.listen(app.get('port'), function() {
  console.log('Seymour Admin server listening at %s', server.address().address, server.address().port);
});

require('./messenger')(require('./messages'), server);

