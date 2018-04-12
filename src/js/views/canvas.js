'use strict';

var Backbone = require('../lib');
var Message = require('./message');

module.exports = Backbone.View.extend({

  tagName: 'canvas',

  initialize: function (options) {
    this.collections = options.collections;
    this.context = this.el.getContext('2d');
    this.el.width = Backbone.$('#page').width();
    this.el.height = Backbone.$('#page').height();

    this.collections.messages.on('add', this.render, this);
    this.collections.notifications.on('remove', this.remove, this);
    this.collections.notifications.on('active', this.toggleMessage, this);
  },

  render: function (model) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.id = model.toJSON().id
    canvas.width = this.el.width;
    canvas.height = this.el.height;

    this.$el.after(canvas);

    const message = new Message();
    message.image.addEventListener('load', function () {
      context.drawImage(message.image, 0, 0);
    }, false);
    message.image.src = model.toJSON().data;
  },

  remove: function (model) {
    model.destroy();
    this.clear(model.toJSON().id);
  },

  clear: function (id) {
    // console.log(Backbone.$('#scene').find('#' + id))
    Backbone.$('#scene').find('#' + id).remove();
    // Backbone.$('canvas' + id).remove();
    // var message.image = this.context.createImageData(this.el.width, this.el.height);
    // for (var i = message.image.data.length; --i >= 0; ) {
    //   message.image.data[i] = 0;
    // }
    // this.context.putImageData(message.image, 0, 0);
  },

  toggleMessage: function (id, isActive) {
    if (!isActive) {
      this.clear(id);
    } else {
      var model = this.collections.messages.findWhere({ id: id });
      if (!model) {
        this.collections.messages.fetch({
          origin: this.origin,
          id: id
        });
      } else {
        this.collections.messages.trigger('add', model);
      }
    }
  }

});
