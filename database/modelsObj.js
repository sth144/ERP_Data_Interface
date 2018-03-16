/***************************************************************************************************
  Title: ModelsObj Object Definition
  Author: Sean Hinds  
  Date: 03/13/18
  Description: Attribute definitions for the ModelsObj object, which holds all meta-data necessary
                for the bioERP Node.js application to query the MySQL database. 
***************************************************************************************************/

/* each property has 4 properties. DOM specifies the functions to be called by the controller on
    the client machine when the page loads, colheaders specifies the column headers to be displayed
    in the browser. SQLcols specifies the column names of the table in the SQL database. 
    insertStrings are passed to the query handler to query the database using user input */


var modelsObj = {
  product: {
    DOM: ['insertForm', 'makeEditable', 'searchBar', 'exportDataButton'],
    colHeaders: ['id', 'name', 'unit', 'shelf life', 'supplier', 'country', 'lead time'],
    SQLcols: ['id', 'name', 'unit', 'shelf_life', 'supplier', 'country', 'lead_time'],
    insertStrings: [
      "(name, unit, shelf_life, supplier, country, lead_time) ", 
      "(?, ?, ?, ?, ?, ?)",
    ],
    foreignKeys: {}
  },
  batch: {
    DOM: ['insertForm', 'makeEditable', 'searchBar', 'exportDataButton'],
    colHeaders: ['id', 'part_no', 'expiration'],
    SQLcols: ['id', 'part_no', 'expiration'],
    insertStrings: [
      "(part_no, expiration) ", 
      "(?, ?)",
    ],
    foreignKeys: {part_no: ['product', ['name']]}
  },
  employee: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'fname', 'lname', 'supervisor', 'department'],
    SQLcols: ['id', 'fname', 'lname', 'supervisor', 'department'],
    insertStrings: [
      "(fname, lname, supervisor, department) ",
      "(?, ?, ?, ?)"
    ],
    foreignKeys: {supervisor: ['employee', ['fname', 'lname']]}
  },
  equipment: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'operators required', 'manufacturer', 'service interval', 'service contact'],
    SQLcols: ['id', 'name', 'operators_required', 'manufacturer', 'service_interval', 'service_contact'],
    insertStrings: [
      "(name, operators_required, manufacturer, service_interval, service_contact)",
      "(?, ?, ?, ?, ?)"
    ],
    foreignKeys: {}
  },
  customer: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'contact'],
    SQLcols: ['id', 'name', 'contact'],
    insertStrings: [
      "(name, contact)",
      "(?, ?)"
    ],
    foreignKeys: {}
  },
  experiment: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'date', 'notes'],
    SQLcols: ['id', 'date', 'notes'],
    insertStrings: [
      "(date, notes)",
      "(?, ?)"
    ],
    foreignKeys: {}
  },
  made_from: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'parent', 'child'],
    SQLcols: ['id', 'parent', 'child'],
    insertStrings: [
      "(parent, child)",
      "(?, ?)"
    ],
    foreignKeys: {parent: ['product', ['name']], child: ['product', ['name']]}
  },
  authorization: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'employee id', 'equipment id'],
    SQLcols: ['id', 'employee_id', 'equipment_id'],
    insertStrings: [
      "(employee_id, equipment_id)",
      "(?, ?)"
    ],
    foreignKeys: {employee_id: ['employee', ['fname', 'lname']], equipment_id: ['equipment', ['id', 'name']]}
  },
  purchase: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'customer id', 'product id', 'amount', 'date'],
    SQLcols: ['id', 'customer_id', 'product_id', 'amount', 'date'],
    insertStrings: [
      "(customer_id, product_id, amount, date)",
      "(?, ?, ?, ?)"
    ],
    foreignKeys: {customer_id: ['customer', ['name']], product_id: ['product', ['name']]}
  },
  experiment_product: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'experiment id', 'product id'],
    SQLcols: ['id', 'experiment_id', 'product_id'],
    insertStrings: [
      "(experiment_id, product_id)",
      "(?, ?)"
    ],
    foreignKeys: {experiment_id: ['experiment', ['id']], product_id: ['product', ['name']]}
  },
  experiment_employee: {
    DOM: ['insertForm', 'makeEditable'],
    colHeaders: ['id', 'experiment id', 'employee id'],
    SQLcols: ['id', 'experiment_id', 'employee_id'],
    insertStrings: [
      "(experiment_id, employee_id)",
      "(?, ?)"
    ],
    foreignKeys: {experiment_id: ['experiment', ['id']], employee_id: ['employee', ['fname', 'lname']]}
  } 
};

module.exports.modelsObj = modelsObj