const { MongoClient } = require('mongodb');
const {db} = require('../config');


const url = db.uri;
var _db = {};

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('user-management');
      console.log(_db);
      return callback( err );
    } );
  },
};
