var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/', function(request, response) {

  var context = {};

  pool.query(

    'SELECT * FROM test;',
    function(err, rows, fields) {

      if (err) {
        next(err);
        return;
      }

      context.results = JSON.stringify(rows);
      response.render('home', context);

    }
  )

})

module.exports = router;
