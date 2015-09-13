'use strict';

var Backbone = require('../lib/'),
  NoteModel = require('../models/notification');

console.log(process)

module.exports = Backbone.Collection.extend({

  model: NoteModel,

  url: 'ws://127.0.0.1:3001',

  entity: 'notifications',

  parse: function (data) {
    if (!Array.isArray(data.res)) {
      data.res.id = data.res._id;
    } else {
      data.res = data.res.map(function (item) {
        item.id = item._id;
        return item;
      });
    }
    return data;
  }

});

