/***************************************************************************************************
  Title: Generic SQL Data Display Router for bioERP Data Interface Application
  Author: Sean Hinds
  Date: 03/13/18
  Description: Provides generic table display functionality. Displays all rows and columns in the 
                table, unfiltered.
***************************************************************************************************/

var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */
var mysql = require('./dbConfig');
var pool = mysql.pool;

/* import model meta-data */
var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

router.get('/', function(req, res, next) {

  var context = {};
  context.model = [req.query.table];

  /* form query string */
  var selectString = ""; 
  for (var i = 0; i < modelsObj[context.model]['SQLcols'].length; i++) {
    selectString += modelsObj[context.model]['SQLcols'][i];
    if (i < modelsObj[context.model]['SQLcols'].length - 1) {
      selectString += ", ";
    } else { selectString += " "; }
  }

  /* query the database and render the page */
  mysql.pool.query(
    "SELECT " + selectString +
    "FROM " + context.model + 
    ";", 
    function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      console.log('generic data render');
      res.render('home', context);
    } 
  )

});

/* select data and return response to client as HTTP response. Not used */
router.get('/models', function(req, res, next) {

  console.log('models sserver')

  var context = {};
  context.modelsObj = JSON.stringify(modelsObj);
  res.send(context);

});

/* export the module */
module.exports = router;
