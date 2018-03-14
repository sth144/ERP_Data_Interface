/***************************************************************************************************
  Title: Database Configuration for bioERP Data Interface
  Author: Sean Hinds
  Date: 03/14/18
  Description: Database configuration for development and production environments.
***************************************************************************************************/

/* MySQL database credentials file */
var mysql = require('mysql');

/* form the connection pool. Process.env holds environment variables on localhost or server */
var pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

/* export module */
module.exports.pool = pool;
