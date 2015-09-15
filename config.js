'use strict';

module.exports = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3002,
  secret: 'pooponthefloor',
  mongodb_address: process.env.MONGODB_ADDRESS || 'mongodb://localhost:27017/test',
  socket_port: process.env.SOCKET_PORT || 3001,
  admin_host: process.env.ADMIN_HOST  || 'http://localhost:3002'
};
