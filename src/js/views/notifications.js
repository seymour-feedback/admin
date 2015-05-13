'use strict';

var PageView = require('./page'),
  NoteView = require('./notification');

module.exports = PageView.extend({

  events: {
    'click li': 'toggle',
    'click input': 'remove'
  },

  initialize: function () {
    PageView.prototype.initialize();
    this.collections.notifications.on('add', this.render, this);
    this.collections.notifications.fetch({ origin: this.origin });
  },

  render: function (model) {
    var note = new NoteView(model.toJSON());
    this.$el.append(note.render());
  },

  toggle: function (e) {
    this.$(e.target).toggleClass('active');
    this.canvas.toggleMessage(e.target, this.$(e.target).hasClass('active'));
  },

  remove: function (e) {
    e.stopPropagation();
    this.collections.notifications.remove(this.collections.notifications.findWhere({ id: e.target.parentNode.id }));
    e.target.parentNode.remove();
  }

});
