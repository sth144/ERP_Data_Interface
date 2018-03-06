var express = require('express');
var router = express.Router();
var path = require('path');

/* import MySQL database credentials from dbConfig, which uses environment variables */

var mysql = require('./dbConfig');
var pool = mysql.pool;

var modelImport = require('./modelsObj')
var modelsObj = modelImport.modelsObj;

router.get('/', function(req, res, next) {
  console.log('hello generic')
  console.log([req.query])
  var context = {};
  context.model = [req.query.table]
  var selectString = ""; var selectString2 = "";
  for (var i = 0; i < modelsObj[context.model]['SQLcols'].length; i++) {
    selectString += modelsObj[context.model]['SQLcols'][i];
    if (i < modelsObj[context.model]['SQLcols'].length - 1) {
      selectString += ", ";
    } else { selectString += " "; }
  }
  var filterRows = false;
  var columnsFiltered = []
  for (var i = 0; i < modelsObj[context.model]['SQLcols'].length; i++) {
    if ( [req.query][0].hasOwnProperty(modelsObj[context.model]['SQLcols'][i]) &&
          [req.query][0][modelsObj[context.model]['SQLcols'][i]] != '') {
      filterRows = true;
      columnsFiltered.push(i);
    }
  }
  if (filterRows) {
    selectString2 += " WHERE ";
    for (var i = 0; i < columnsFiltered.length; i++) {
      selectString2 += modelsObj[context.model]['SQLcols'][columnsFiltered[i]];
      selectString2 += "='";
      selectString2 += [req.query][0][modelsObj[context.model]['SQLcols'][columnsFiltered[i]]];
      selectString2 += "'";
      if (i < columnsFiltered.length - 1) {
        selectString2 += " AND "
      }
    }
  }
  console.log('select strings ' + selectString + ' and ' + selectString2);
  mysql.pool.query(
    "SELECT " + selectString +
    "FROM " + context.model + 
    selectString2 +
    ";", 
    function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = JSON.parse(JSON.stringify(rows));
      console.log('generic send refresh select');
      res.send(context);
    } 
  )
});

module.exports = router;
