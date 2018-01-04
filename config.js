'use strict';

console.log(process.env.MONGODB_ADDRESS)
module.exports = {
  port: process.env.PORT || 3002,
  secret: 'pooponthefloor',
  mongodb_address: process.env.MONGODB_ADDRESS,
  socket: {
    port: process.env.SOCKET_PORT || 3001,
    host: process.env.SOCKET_HOST || 'localhost'
  }
};
