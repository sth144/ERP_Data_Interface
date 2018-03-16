/***************************************************************************************************
  Title: DOM Controller for bioERP Data Interface Application
  Author: Sean Hinds
  Date: 03/13/18
  Description: Populates the forms and constructs the DOM of the main data-display page. 
***************************************************************************************************/

/* onload */

document.body.onload = function() {

	/* define model behavior using modelsObj object stored on the server */
	var modelsObj;
	var modelsReq = new XMLHttpRequest();
	modelsReq.open("GET", "/data/models", true);
	modelsReq.addEventListener("load", function() {
	

		if (modelsReq.status >= 200 && modelsReq.status < 400) {
			var response = JSON.parse(modelsReq.responseText);
			modelsObj = JSON.parse(response['modelsObj']);
			console.log(modelsObj)

			/* set current data model */

			var model = document.getElementById('model-header').textContent;
			console.log('model is ' + model);

			/* construct model DOM */

			constructDom();

			/* function definitions */

			/* refreshData() refreshes table display using AJAX */

			function refreshData(mod, queryString) {
				console.log('col headers ', modelsObj[model]['colHeaders']);
				var refresh = new XMLHttpRequest();
				refresh.open("GET", "/select?table=" + mod + queryString, true);
				refresh.addEventListener("load", function() {
					if (refresh.status >= 200 && refresh.status < 400) {
						console.log('generic client-refresh ' + mod);
						var rebuild = JSON.parse(refresh.responseText).results;
						var tableBody = document.getElementById('tab').childNodes[3];
						while (tableBody.firstChild) {
							tableBody.removeChild(tableBody.firstChild);
						}
						for (var i = 0; i < rebuild.length; i++) {
							var newRow = document.createElement('tr');
							/* rebuild table using response text */
							for (var j = 0; j < modelsObj[model]['SQLcols'].length; j++) {
								var newData = document.createElement('td');
								newData.textContent = rebuild[i][modelsObj[model]['SQLcols'][j]];
								newRow.appendChild(newData);
							}
							tableBody.appendChild(newRow);
						}
						constructDom();
					}
					else {
						console.log('error');
					}
				})
				refresh.send(null); event.preventDefault;
			}

			/* constructDom() builds the DOM according to the DOM property of the model in modelsObj */

			function constructDom() {
				if (model !== 'none') {	// if a model is to be displayed
					for (var i = 0; i < modelsObj[model]['DOM'].length; i++) {
						if (modelsObj[model]['DOM'][i] == 'insertForm') {insertForm();}
						if (modelsObj[model]['DOM'][i] == 'makeEditable') {makeEditable();}
						if (modelsObj[model]['DOM'][i] == 'searchBar') {insertSearchBar();}
						if (modelsObj[model]['DOM'][i] == 'exportDataButton') {exportDataButton();}
					}
				}
			}

			/* insertForm() appends insert form to the page */

			function insertForm() {

				console.log('forming model=' + model + ' forms');

				var insertForm = document.createElement("form"); insertForm.id = "insertForm"; insertForm.action="/insert"; insertForm.classList.add('my-form');
				var tableNameHidden = document.createElement("input"); tableNameHidden.type = "hidden"; tableNameHidden.name = "tableName"; tableNameHidden.value = model;
				insertForm.appendChild(tableNameHidden);
				var tableTitle = document.createElement("h3"); tableTitle.textContent = "New " + model;
				insertForm.appendChild(tableTitle);

				/* iterate through each attribute of model */
				for (var i = 0; i < modelsObj[model]['SQLcols'].length; i++) {
					if (modelsObj[model]['foreignKeys'].hasOwnProperty(modelsObj[model]['SQLcols'][i])) {
						/* foreign key, allow user to select from a dropdown */
						(function() {	// wrap in a closure function to bind XMLHttpRequests over multiple loop iterations
							/* create a new select element */
							var newSelect = document.createElement("select");
							var newSelectLabel = document.createElement("strong");
							newSelectLabel.innerHTML = modelsObj[model]['SQLcols'][i];
							newSelect.name = modelsObj[model]['SQLcols'][i];
							newSelect.classList.add('form-group');
							/* grab strings to use to build option strings */
							var newSelectNamesArr = modelsObj[model]['foreignKeys'][modelsObj[model]['SQLcols'][i]][1];
							/* open an XMLHttpRequest to get data for foreign key table */
							var selectDropReq = new XMLHttpRequest();
							selectDropReq.open("GET", "/select?table=" + modelsObj[model]['foreignKeys'][modelsObj[model]['SQLcols'][i]][0], true);
							selectDropReq.addEventListener("load", function() {
								if (selectDropReq.status >= 200 && selectDropReq.status < 400) { 
									var fkRows = JSON.parse(selectDropReq.responseText).results;
									/* iterate through each row in the response (foreign key table */
									for (var k = 0; k < fkRows.length; k++) {
										/* create a new option */
										var newOption = document.createElement("option");
										newOption.value = fkRows[k]['id'];
										for (var j = 0; j < newSelectNamesArr.length; j++) {
											newOption.innerHTML += fkRows[k][newSelectNamesArr[j]] + " ";		// display string for the option
										}
										newSelect.appendChild(newOption);
									}
								}
							})
							selectDropReq.send(null); event.preventDefault();
							insertForm.appendChild(newSelectLabel); insertForm.appendChild(document.createElement('br'));
							insertForm.appendChild(newSelect); insertForm.appendChild(document.createElement('br'));
						})();		// End closure function call (necessary to bind XMLHttpRequests)
					}
					else {
						var newField = document.createElement("input"); if (i == 0) {newField.type = "hidden";}
						newField.placeholder = modelsObj[model]['colHeaders'][i];
						newField.name = modelsObj[model]['SQLcols'][i];
						newField.classList.add('form-group');
						insertForm.appendChild(newField); insertForm.appendChild(document.createElement('br'));
					}
				}

				var submit = document.createElement("button"); submit.id = "submit"; submit.type = "button"; submit.textContent = "Submit"; 
				insertForm.appendChild(submit); /**insertForm.appendChild(document.createElement("br"));*/

				var tableNode = document.getElementById("tableForms2");
				while (tableNode.firstChild) {
					tableNode.removeChild(tableNode.firstChild);
				}
				tableNode.appendChild(insertForm);

			}

			/* makeEditable() makes the page editable (edit and delete buttons on each row in the table) */

			function makeEditable() {

				console.log('making editable');

				$('#tab > tbody > tr').each( function() {
							/* append edit button to row */

							var editTd = document.createElement('td');
							var editButton = document.createElement('button');
							editButton.className = "editRow";
							editButton.textContent = "Edit";
							editTd.appendChild(editButton);
							this.appendChild(editTd)

							/* append delete button to row */
							var delTd = document.createElement('td');
							var delButton = document.createElement('button');
							delButton.className = "deleteRow";
							delButton.textContent = "Delete";
							delTd.appendChild(delButton);
							this.appendChild(delTd)	
				});

				/* JQuery onclick function for edit row */
				$(".editRow").click(function() {
					var table = document.getElementById('tab');
					// Count rows in the table
					var rowCount = table.rows.length;
					var found = false;
					// Iterate through each row
					for (var i = 0; i < rowCount; i++) {
						var row = table.rows[i];
						console.log('row ' + i + ' found ' + found);
						// Insert edit form in the row where the edit button was clicked
						if (row == this.parentNode.parentNode && found == false) {
							found = true;
							insertEditForm(row);
						}
					}
				});

				/* JQuery onclick functionality for deleteRow button */
				$(".deleteRow").click(function(){ 	
					var id; 
			   		id=$(this).closest('tr').children('td:first').text();  
					var del = new XMLHttpRequest();

					/* use delete router to delete from table */
					del.open("GET", "/delete/?table=" + model + "&id=" + id, true);

					del.addEventListener("load", function() {
						if (del.status >= 200 && del.status < 400) {
							console.log('client-delete');
							console.log(del.responseText);
							refreshData(model, "");
						}
						else {
							console.log('error');
						}
					})
					del.send(null);
					event.preventDefault; 
				});

				/* want to refresh page (not reload) upon insert */
				document.getElementById("submit").onclick = function() {
					var req = new XMLHttpRequest();
					req.open('GET', $('#insertForm').attr('action') + "?" + $('#insertForm').serialize(), true);
					req.addEventListener("load", function() {
						console.log('loaded');
						if (req.status >= 200 && req.status < 400) {
							/* need to call twice to prevent buggy inconsistence */
							refreshData(model, ""); refreshData(model, "");
						}
					});
					req.send(null);
					event.preventDefault();
				}

			}

			/* insertEditForm() temporarily replaces row with an edit form populated with current data from that row */

			function insertEditForm(row) {

				console.log('inserteditform');
				var rowData = row.getElementsByTagName('td');

				/* hide row */
				row.style.display = "none";
				/* create edit form */

				var tempRow = document.createElement('tr');
				var editForm = document.createElement('form');
				editForm.id = 'editForm';
				editForm.action = '/update';
				editForm.classList.add('my-form');

				var itemBeingEdited = document.createElement('h4');
				itemBeingEdited.textContent = "Edit " + model + " " + rowData[0].textContent;
				editForm.appendChild(itemBeingEdited);

				var tableField;

				/* tailor form to model */

				for (var i = 0; i < modelsObj[model]['SQLcols'].length; i++) {
					if (modelsObj[model]['foreignKeys'].hasOwnProperty(modelsObj[model]['SQLcols'][i])) {
						/* foreign key, allow user to select from a dropdown */
						(function() {	// wrap in a closure function to bind XMLHttpRequests over multiple loop iterations
							/* create a new select element */
							var newSelect = document.createElement("select");
							var newSelectLabel = document.createElement("strong");
							newSelectLabel.innerHTML = modelsObj[model]['foreignKeys'][modelsObj[model]['SQLcols'][i]][0];
							newSelect.name = modelsObj[model]['SQLcols'][i];
							newSelect.classList.add('form-group');
							/* grab strings to use to build option strings */
							var newSelectNamesArr = modelsObj[model]['foreignKeys'][modelsObj[model]['SQLcols'][i]][1];
							/* open an XMLHttpRequest to get data for foreign key table */
							var selectDropReq = new XMLHttpRequest();
							selectDropReq.open("GET", "/select?table=" + modelsObj[model]['foreignKeys'][modelsObj[model]['SQLcols'][i]][0], true);
							selectDropReq.addEventListener("load", function() {
								if (selectDropReq.status >= 200 && selectDropReq.status < 400) { 
									var fkRows = JSON.parse(selectDropReq.responseText).results;
									/* iterate through each row in the response (foreign key table) */
									for (var k = 0; k < fkRows.length; k++) {
										/* create a new option */
										var newOption = document.createElement("option");
										newOption.value = fkRows[k]['id'];
										for (var j = 0; j < newSelectNamesArr.length; j++) {
											newOption.innerHTML += fkRows[k][newSelectNamesArr[j]] + " ";		// display string for the option
										}
										newSelect.appendChild(newOption);
									}
								}
							})
							selectDropReq.send(null); event.preventDefault();
							editForm.appendChild(newSelectLabel); editForm.appendChild(document.createElement('br'));
							editForm.appendChild(newSelect); editForm.appendChild(document.createElement('br'));
						})();		// End closure function call (necessary to bind XMLHttpRequests)
					}
					else {
						var newField = document.createElement('input'); if (i == 0) { newField.type = "hidden" } 
						var newFieldTitle = document.createElement('strong'); if (i == 0) { newFieldTitle.style.visibility = "hidden" }
						newFieldTitle.textContent = modelsObj[model]['colHeaders'][i];
						newField.name = modelsObj[model]['SQLcols'][i];
						/* truncate the data if it is a date, do not display */
						if (newField.name == 'expiration' || 
							newField.name == 'date') {
								newField.value = rowData[i].textContent.substring(0, 10);
						}
						else {
							newField.value = rowData[i].textContent;
						}
						editForm.appendChild(newFieldTitle);
						editForm.appendChild(document.createElement('br'));
						editForm.appendChild(newField);
					}
				}

				var newSubmit = document.createElement('button');
				newSubmit.id = 'newSubmit';
				newSubmit.innerHTML = 'Update';
				newSubmit.classList.add('form-group');

				editForm.appendChild(document.createElement('br')); editForm.appendChild(document.createElement('br')); 
				editForm.appendChild(newSubmit);
				tempRow.appendChild(editForm);
				row.parentNode.insertBefore(tempRow, row);

				/* onclick for editForm submit button */

				newSubmit.onclick = function() {
					var update = new XMLHttpRequest()
					console.log($('#editForm').serialize());
					update.open('GET', '/update?table=' + model + "&" + $('#editForm').serialize(), true);
					update.addEventListener('load', function() {
						if (update.status >= 200 && update.status < 400) {
							console.log('HEY');
							refreshData(model, "");
						}
					})
					update.send(null);
					event.preventDefault();
				}

			}

			/* insertSearchBar() inserts a form which allows the user to search the data in the table */

			function insertSearchBar() {

				console.log('insert search bar');

				/* create search form and append to page */

				var searchForm = document.createElement("form"); searchForm.id = "searchForm"; searchForm.onsubmit = function() {event.preventDefault();}; 
				searchForm.classList.add('my-form');
				var tableNameHidden = document.createElement("input"); tableNameHidden.type = "hidden"; tableNameHidden.name = "tableName"; tableNameHidden.value = model;
				searchForm.appendChild(tableNameHidden);
				var tableTitle = document.createElement("h3"); tableTitle.textContent = "Search " + model;
				searchForm.appendChild(tableTitle);

				for (var i = 0; i < modelsObj[model]['SQLcols'].length; i++) {
					var newField = document.createElement("input"); if (i == 0) {newField.type = "hidden";}
					newField.placeholder = modelsObj[model]['colHeaders'][i];
					newField.name = modelsObj[model]['SQLcols'][i];
					newField.classList.add('form-group');
					searchForm.appendChild(newField); searchForm.appendChild(document.createElement('br'));
				}

				var submit = document.createElement("button"); submit.id = "submitSearch"; submit.type = "button"; submit.textContent = "Submit"; 
				searchForm.appendChild(submit); 

				var tableNode = document.getElementById("tableForms");
				while (tableNode.firstChild) {
					tableNode.removeChild(tableNode.firstChild);
				}
				tableNode.appendChild(searchForm);

				/* onclick functionality for searchForm submit */
				submit.onclick = function() {
					console.log('search');
					var qString = '&' + $('#searchForm').serialize();
					console.log(qString);
					refreshData(model, qString);
				}

			}

			/* exportDataButton() appends export .csv button to bottom of table */
			
			function exportDataButton() {
				var exportButton = document.createElement("button");
				exportButton.innerHTML = "Export .csv";
				var container = document.getElementById("bottom-button");
				while (container.firstChild) {
					container.removeChild(container.firstChild);
				}
				container.appendChild(exportButton);
				exportButton.onclick = function() {
					csvExport();
				}
			}

		/* end XMLHttpRequest for model data */

		} else {console.log("error");}
	});
	modelsReq.send(null); event.preventDefault();

} // end onload