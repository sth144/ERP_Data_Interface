var modelsObj = {
  product: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'unit', 'shelf life', 'supplier', 'country', 'lead time'],
    SQLcols: ['id', 'name', 'unit', 'shelf_life', 'supplier', 'country', 'lead_time'],
    insertStrings: [
      "(name, unit, shelf_life, supplier, country, lead_time) ", 
      "(?, ?, ?, ?, ?, ?)",
    ]
  },
  employee: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'fname', 'lname', 'supervisor', 'department'],
    SQLcols: ['id', 'fname', 'lname', 'supervisor', 'department'],
    insertStrings: [
      "(fname, lname, supervisor, department) ",
      "(?, ?, ?, ?)"
    ]
  },
  equipment: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'operators required', 'manufacturer', 'service interval', 'service contact'],
    SQLcols: ['id', 'name', 'operators_required', 'manufacturer', 'service_interval', 'service_contact'],
    insertStrings: [
      "(name, operators_required, manufacturer, service_interval, service_contact)",
      "(?, ?, ?, ?, ?)"
    ]
  },
  customer: {
    DOM: ['insertForm', 'makeEditable', 'searchBar'],
    colHeaders: ['id', 'name', 'contact'],
    SQLcols: ['id', 'name', 'contact'],
    insertStrings: [
      "(name, contact)",
      "(?, ?)"
    ]
  },
  experiment: {
    DOM: [],
    colHeaders: [],
    SQLcols: [],
    insertStrings: [
      "",
      ""
    ]
  },
  made_from: {
    DOM: [],
    colHeaders: [],
    SQLcols: [],
    insertStrings: [
      "",
      ""
    ]
  },
  authorization: {
    DOM: [],
    colHeaders: [],
    SQLcols: [],
    insertStrings: [
      "",
      ""
    ]
  },
  purchase: {
    DOM: [],
    colHeaders: [],
    SQLcols: [],
    insertStrings: [
      "",
      ""
    ]
  },
  experiment_product: {
    DOM: [],
    colHeaders: [],
    SQLcols: [],
    insertStrings: [
      "",
      ""
    ]
  },
  experiment_employee: {
    DOM: [],
    colHeaders: [],
    SQLcols: [],
    insertStrings: [
      "",
      ""
    ]
  } 
};

module.exports.modelsObj = modelsObj