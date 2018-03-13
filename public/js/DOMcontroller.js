/* onload */

document.body.onload = function() {

	/* define model behavior */

	/* figure out a way to get this from server */

	var modelsObj;
	var modelsReq = new XMLHttpRequest();
	modelsReq.open("GET", "/data/models", true);
	modelsReq.addEventListener("load", function() {
	
	/* these 3 lines not indented */
	if (modelsReq.status >= 200 && modelsReq.status < 400) {
	var response = JSON.parse(modelsReq.responseText);
	modelsObj = JSON.parse(response['modelsObj']);
	console.log(modelsObj)

	/* set data model */

	var model = document.getElementById('model-header').textContent;
	console.log('model is ' + model);

	/* construct model DOM */

	constructDom();

	/* function definitions */

	function refreshData(mod, queryString) {

		console.log('col headers ', modelsObj[model]['colHeaders']);

		var refresh = new XMLHttpRequest();
		refresh.open("GET", "/select?table=" + mod + queryString, true);

		refresh.addEventListener("load", function() {

			if (refresh.status >= 200 && refresh.status < 400) {

				console.log('generic client-refresh ' + mod);
				console.log(refresh.responseText.results);

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

	function constructDom() {
		for (var i = 0; i < modelsObj[model]['DOM'].length; i++) {
			if (modelsObj[model]['DOM'][i] == 'insertForm') {insertForm();}
			if (modelsObj[model]['DOM'][i] == 'makeEditable') {makeEditable();}
			if (modelsObj[model]['DOM'][i] == 'searchBar') {insertSearchBar();}
			if (modelsObj[model]['DOM'][i] == 'exportDataButton') {exportDataButton();}
		}
	}

	function insertForm() {

		console.log('forming model=' + model + ' forms');

		var insertForm = document.createElement("form"); insertForm.id = "insertForm"; insertForm.action="/insert"; insertForm.classList.add('my-form');
		var tableNameHidden = document.createElement("input"); tableNameHidden.type = "hidden"; tableNameHidden.name = "tableName"; tableNameHidden.value = model;
		insertForm.appendChild(tableNameHidden);
		var tableTitle = document.createElement("h3"); tableTitle.textContent = "New " + model;
		insertForm.appendChild(tableTitle);

		for (var i = 0; i < modelsObj[model]['SQLcols'].length; i++) {
			var newField = document.createElement("input"); if (i == 0) {newField.type = "hidden";}
			newField.placeholder = modelsObj[model]['colHeaders'][i];
			newField.name = modelsObj[model]['SQLcols'][i];
			newField.classList.add('form-group');
			insertForm.appendChild(newField); insertForm.appendChild(document.createElement('br'));
		}

		var submit = document.createElement("button"); submit.id = "submit"; submit.type = "button"; submit.textContent = "Submit"; 
		insertForm.appendChild(submit); /**insertForm.appendChild(document.createElement("br"));*/

		var tableNode = document.getElementById("tableForms2");
		while (tableNode.firstChild) {
			tableNode.removeChild(tableNode.firstChild);
		}
		tableNode.appendChild(insertForm);

	}


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

		$(".deleteRow").click(function(){ 
			
			var id; 
	   		id=$(this).closest('tr').children('td:first').text();  
			var del = new XMLHttpRequest();

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

		for (var i = 0; i < modelsObj[model]['SQLcols'].length; i++) {
			var newField = document.createElement('input'); if (i == 0) { newField.type = "hidden" } 
			var newFieldTitle = document.createElement('strong'); if (i == 0) { newFieldTitle.style.visibility = "hidden" }
			newFieldTitle.textContent = modelsObj[model]['colHeaders'][i];
			newField.name = modelsObj[model]['SQLcols'][i];
			newField.value = rowData[i].textContent;
			editForm.appendChild(newFieldTitle);
			editForm.appendChild(document.createElement('br'));
			editForm.appendChild(newField);
		}

		var newSubmit = document.createElement('button');
		newSubmit.id = 'newSubmit';
		newSubmit.innerHTML = 'Update';
		newSubmit.classList.add('form-group');

		editForm.appendChild(document.createElement('br')); editForm.appendChild(document.createElement('br')); 
		editForm.appendChild(newSubmit);
		tempRow.appendChild(editForm);
		row.parentNode.insertBefore(tempRow, row);

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

	function insertSearchBar() {

		console.log('insert search bar');

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

		submit.onclick = function() {
			console.log('search');
			var qString = '&' + $('#searchForm').serialize();
			console.log(qString);
			refreshData(model, qString);
		}

	}

	function exportDataButton() {
		var exportButton = document.createElement("button");
		exportButton.innerHTML = "Export .csv";
		var container = document.getElementById("bottom-button");
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