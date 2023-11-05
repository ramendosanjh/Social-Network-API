// Purpose: connect to mangodb
const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socialNetwork');

module.exports = connection;