'use strict';

module.exports = {
  port: process.env.PORT || 3002,
  secret: 'pooponthefloor',
  mongodb_address: process.env.MONGODB_ADDRESS || 'mongodb://localhost:27017/test',
  socket: {
    port: process.env.SOCKET_PORT || 3001,
    host: process.env.SOCKET_HOST || 'localhost'
  }
};
