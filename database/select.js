var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

router.get('/', function(req,res,next) {

  // Define context for the local scope
  
  var context = {};

  // Query the database

  mysql.pool.query("SELECT * FROM test;", function(err, rows, fields) {

    // Error handling

    if(err){
      next(err);
      return;
    }

    // Process data and render table

    context.results = JSON.parse(JSON.stringify(rows));
    console.log('sending refresh');
    res.render('home', context);

  });

});

router.get('/product', function(req,res,next) {
  
  var context = {};

  mysql.pool.query(
  	"SELECT id, name, unit, shelf_life, supplier, country, lead_time " +
  	"FROM product;", function(err, rows, fields) {

    if(err){
      next(err);
      return;
    }

    context.results = JSON.parse(JSON.stringify(rows));
    console.log('sending refresh');
    res.render('home', context);

  });

});

router.get('/employee', function(req,res,next) {
  
  var context = {};

  mysql.pool.query("SELECT name, supervisor, department FROM employee;", function(err, rows, fields) {

    if(err){
      next(err);
      return;
    }

    context.results = JSON.parse(JSON.stringify(rows));
    console.log('sending refresh');
    res.render('home', context);

  });

});

module.exports = router;