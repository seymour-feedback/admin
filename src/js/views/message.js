'use strict';

var Backbone = require('../lib/');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.image = new window.Image();

    this.image.addEventListener('load', function () {
      ctx.drawImage(this.image, 0, 0);
    }, false);
    // this.image.src = data.data;
  },

  render: function () {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.id = model.toJSON().id
    canvas.width = this.el.width;
    canvas.height = this.el.height;

    this.$el.after(canvas);

    // TODO - move code to message class

    var img = new window.Image();

    img.addEventListener('load', function () {
      context.drawImage(img, 0, 0);
    }.bind(this), false);
    img.src = model.toJSON().data;
  }

});
