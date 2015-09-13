'use strict';

var Backbone = require('../lib/'),
  NotificationsCollection = require('../collections/notifications'),
  MessageCollection = require('../collections/messages'),
  NotificationsView = require('./notifications'),
  IframeView = require('./iframe'),
  CanvasView = require('./canvas');

module.exports = Backbone.View.extend({

  initialize: function () {

    this.collections = {};
    this.collections.messages = new MessageCollection(),
    this.collections.notifications = new NotificationsCollection();

    this.iframe = new IframeView();
    this.origin = this.iframe.src();

    var notes = new NotificationsView({
      el: '#notifications',
      collection: this.collections.notifications,
      origin: this.origin
    });

    this.canvas = new CanvasView({
      collections: this.collections
    });

    this.iframe.$el.before(this.canvas.el);

  }

});
