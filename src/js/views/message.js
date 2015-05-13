'use strict';

var Backbone = require('../lib/');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.image = new window.Image();

    this.image.addEventListener('load', function () {
      ctx.drawImage(this.image, 0, 0);
    }, false);
    // this.image.src = data.data;
  }

});
