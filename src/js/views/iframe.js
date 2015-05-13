'use strict';

var Backbone = require('../lib/');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.setElement('iframe');
    this.el.height = window.document.documentElement.clientHeight;
    this.el.width = Backbone.$('#page').width();
  }

});
