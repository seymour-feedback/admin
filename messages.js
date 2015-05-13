'use strict';

module.exports = function (connection) {
  return function (messenger) {
    connection.on('message', function messaged(message) {
      var data = JSON.parse(message);
      switch (data.method) {
      case 'create':
        messenger.create(data);
        break;
      case 'read':
        messenger.read(data);
        break;
      case 'update':
        messenger.update(data);
        break;
      case 'delete':
        messenger.delete.call(connection, data);
        break;
      default:
        break;
      }
    });
  };
};
