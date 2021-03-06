'use strict';

const WebSocketServer = require('ws').Server;
const config = require('../config');
const models = require('../models');

module.exports = function (messages, server) {

  const socket = new WebSocketServer({ server: server });

  function broadcast(req, res) {

    socket.clients.forEach(function (client) {
      if (client.upgradeReq.headers.host === client.upgradeReq.headers.origin.replace('http://', '')) {
        if (Array.isArray(res) && req.entity === 'notifications') {
          res = res.filter(function (msg) { return req.origin === msg.location; });
        }
        if (req.entity === 'image') {
          req.entity = 'notifications';
        }
        client.send(JSON.stringify({ entity: req.entity, method: req.method, res: res }));
      }
    });
  }

  socket.on('connection', function onConnection(connection) {
    messages(connection)({
      create: function (req) {
        models.message
          .create(req)
          .then(broadcast.bind(socket, req))
          .catch(console.warn.bind(console, 'Error trying to create'));
      },
      read: function (req) {
        models.message
          .read(req.id)
          .then(broadcast.bind(socket, req))
          .catch(console.warn.bind(console, 'Error trying to read'));
      },
      update: function () {
        console.log('UPDATE');
      },
      delete: function (req) {
        models.message
          .delete(req.id)
          .then(broadcast.bind(socket, req))
          .catch(console.warn.bind(console, 'Error trying to delete'));
      },
    });
  });

};
