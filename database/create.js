var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/', function(request, response) {

  var context = {};

  pool.query(

  	'DROP TABLE IF EXISTS `test`;', function(error) {
  	
  		pool.query(
	
		    'CREATE TABLE `test` (' +
	    	'`id` int(11) NOT NULL AUTO_INCREMENT,' +
	    	'`name` varchar(45) DEFAULT NULL,' +
	    	'PRIMARY KEY (`id`)' +
	    	') ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;',

	    	function(err, rows, fields) {

	    	  if (err) {
	    	    next(err);
	    	    return;
	    	  }
			
			}

		)
	
    }

  )

  response.send();

})

module.exports = router;