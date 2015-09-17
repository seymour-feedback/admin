'use strict';

var Backbone = require('backbone'),
  $ = require('jquery'),
  webSocket = null,
  open = false,
  models = {};

var config = require('../../../config');
var protocol = window.location.protocol === 'https://' ? 'wss://' : 'ws://';

Backbone.sync = function (method, model, options) {
  if (!webSocket) {
    webSocket = new window.WebSocket(protocol + window.location.hostname + ':' + config.socket_port);
  }

  options = options || {};

  if (!models[model.entity]) {
    models[model.entity] = model;
  }

  if (open) {
    webSocket.send(JSON.stringify({
      method: method,
      entity: model.entity,
      origin: options.origin,
      id:     options.id || model.id
    }));
  }

  webSocket.onopen = function connectionOpen() {

    open = true;

    webSocket.onmessage = function (message) {

      var data = JSON.parse(message.data);
      var model = models[data.entity];

      data = model.parse(data);
      if (data.method !== 'delete') {
        model.add(data.res, { merge: true });
      }
    };

    webSocket.send(JSON.stringify({
      method: method,
      entity: model.entity,
      origin: options.origin
    }));

  };

};

Backbone.$ = $;

module.exports = Backbone;
