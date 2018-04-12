'use strict';

var Backbone = require('../lib/');

module.exports = Backbone.View.extend({

  initialize: function (options) {
    this.image = new window.Image();
  }

});
