'use strict';

var WebSocketServer = require('ws').Server,
  config = require('../config'),
  socket = new WebSocketServer({ port: config.socket_port }),
  models = require('../models');

function broadcast(req, res) {
  socket.clients.forEach(function (client) {
    if (client.upgradeReq.headers.origin === config.admin_host) {
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

module.exports = function (messages) {

  socket.on('connection', function onConnection(connection) {
    messages(connection)({
      create: function (req) {
        models.message
          .create(req)
          .then(broadcast.bind(socket, req))
          .catch(console.warn.bind(console, 'Error trying to create'));
      },
      read: function (req) {
        models.message.read(req.id)
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
