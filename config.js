'use strict';

module.exports = {
  ip: '127.0.0.1',
  port: process.env.PORT || 3002,
  sessionSecret: 'pooponthefloor',
  creds: {
    mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test'
  },
  socketPort: process.env.SOCKET_PORT || 3001,
  adminHost: 'http://localhost:3002'
};
