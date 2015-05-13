'use strict';

var Backbone = require('../lib/'),
  NotificationsCollection = require('../collections/notifications'),
  MessageCollection = require('../collections/messages'),
  IframeView = require('./iframe'),
  CanvasView = require('./canvas');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.collections = {};
    this.collections.messages = new MessageCollection(),
    this.collections.notifications = new NotificationsCollection();

    this.setElement('#page');
    this.origin = this.$('iframe').attr('src');

    this.iframe = new IframeView();

    this.canvas = new CanvasView({
      collections: this.collections
    });

    this.$('#scene').append(this.canvas.el);
  }

});
