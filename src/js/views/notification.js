'use strict';

var Backbone = require('../lib/');

module.exports = Backbone.View.extend({

  tagName: 'li',

  render: function () {
    this.$el.html('New message!<input type="checkbox" title="delete" />');
    return this.$el;
  }

});
