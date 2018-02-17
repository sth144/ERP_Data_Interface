var mysql = require('./dbConfig.js');
var pool = mysql.pool;

module.exports = {mysql, pool}
