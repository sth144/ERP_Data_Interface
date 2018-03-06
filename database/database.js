var express = require('express');
var router = express.Router();

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

router.get('/', function(req, res, next) {

  var context = {};
  context.model = [req.query.table];

  var selectString = ""; 
  for (var i = 0; i < modelsObj[context.model]['SQLcols'].length; i++) {
    selectString += modelsObj[context.model]['SQLcols'][i];
    if (i < modelsObj[context.model]['SQLcols'].length - 1) {
      selectString += ", ";
    } else { selectString += " "; }
  }

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

router.get('/models', function(req, res, next) {

  console.log('models sserver')

  var context = {};
  context.modelsObj = JSON.stringify(modelsObj);
  res.send(context);

});

module.exports = router;
