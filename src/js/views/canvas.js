'use strict';

var Backbone = require('../lib');

module.exports = Backbone.View.extend({

  tagName: 'canvas',

  initialize: function (options) {
    this.collections = options.collections;
    this.context = this.el.getContext('2d');
    this.el.width = Backbone.$('#page').width();
    this.el.height = Backbone.$('#page').height();
    this.collections.messages.on('add', this.render, this);
    this.collections.notifications.on('remove', this.remove, this);
  },

  render: function (model) {
    var img = new window.Image();
    this.clear();
    img.addEventListener('load', function () {
      this.context.drawImage(img, 0, 0);
    }.bind(this), false);
    img.src = model.toJSON().data;
  },

  remove: function (model) {
    model.destroy();
    this.clear();
  },

  clear: function () {
    var img = this.context.createImageData(this.el.width, this.el.height);
    for (var i = img.data.length; --i >= 0; ) {
      img.data[i] = 0;
    }
    this.context.putImageData(img, 0, 0);
  },

  toggleMessage: function (element, isActive) {
    if (!isActive) {
      this.clear();
    } else {
      var model = this.collections.messages.findWhere({ id: element.id });
      if (!model) {
        this.collections.messages.fetch({
          origin: this.origin,
          id: element.id
        });
      } else {
        this.collections.messages.trigger('add', model);
      }
    }
  }

});
