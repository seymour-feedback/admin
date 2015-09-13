'use strict';

var Backbone = require('../lib/'),
  NoteView = require('./notification'),
  CanvasView = require('./canvas');

module.exports = Backbone.View.extend({

  events: {
    'click li': 'toggle',
    'click input': 'remove'
  },

  initialize: function notificationsConstructor(options) {
    console.log(this, options);
    this.collection.on('add', this.render, this);
    this.collection.fetch({ origin: options.origin });
  },

  render: function (model) {
    var note = new NoteView(model.toJSON());
    this.$el.append(note.render());
  },

  toggle: function (e) {
    this.$(e.target).toggleClass('active');
    this.collection.trigger('active', e.target.id, this.$(e.target).hasClass('active'));
  },

  remove: function (e) {
    e.stopPropagation();
    this.collection.remove(this.collection.findWhere({ id: e.target.parentNode.id }));
    e.target.parentNode.remove();
  }

});
