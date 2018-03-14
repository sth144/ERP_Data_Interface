/***************************************************************************************************
  Title: Database Configuration template for bioERP Data Interface
  Author: Sean Hinds
  Date: 03/14/18
  Description: Database configuration template. Input environment variables for security.
***************************************************************************************************/

/* copy this to your config file */
var mysql = require('mysql');

/* construct connection pool */
var pool = mysql.createPool({
	connectionLimit: 10,
	host: '',
	user: '',
	password: '',
  database: ''
});

/* export module */
module.exports.pool = pool;
