var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/', function(req,res,next) {

  // Define context for the local scope
  
  var context = {};

  // Query the database

  mysql.pool.query('SELECT * FROM test', function(err, rows, fields) {

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Process data and render table

    context.results = JSON.parse(JSON.stringify(rows));
    console.log('displaying refresh');
    console.log(context.results);
    res.render('home', context);

  });

});


module.exports = router;
