
var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function searchFunByid(){
    var filter= document.getElementById("myInput").value.toUpperCase();
    var filter1= document.getElementById("myInput1").value.toUpperCase();
    var filter2= document.getElementById("myInput2").value.toUpperCase();
    var filter3= document.getElementById("myInput3").value.toUpperCase();
    
    var searchTable= document.getElementById("employeeList");
    var tr= searchTable.getElementsByTagName('tr');
  // console.log(tr);
    for(var i=1;i<tr.length;i++){
      var td= tr[i].getElementsByTagName('td');
      // console.log(td);
      // console.log(td[0],filter);
      
      if(td){
        // let textvalue= td.textContent||td.innerHTML;
        if(filter=="" && filter1=="" && filter2=="" && filter3=="")
           tr[i].style.display="";
        else{
        if((filter!="" && td[0].innerHTML.toUpperCase().indexOf(filter)>-1)||
          (filter1!="" && td[1].innerHTML.toUpperCase().indexOf(filter1)>-1)||
          (filter2!="" && td[2].innerHTML.toUpperCase().indexOf(filter2)>-1)||
         (filter3!="" && td[3].innerHTML.toUpperCase().indexOf(filter3)>-1))
          {
          tr[i].style.display ="";
        }else{
          tr[i].style.display = "none";
        }
       }
      }
    }
 }
 function resetSearch() {
  document.getElementById("myInput").value="";
  document.getElementById("myInput1").value="";
  document.getElementById("myInput2").value="";
  document.getElementById("myInput3").value="";

  searchFunByid();
}


var th=document.getElementsByTagName('th');
console.log(th);
for(let c=0;c<th.length;c++){
  th[c].addEventListener('click',item(c))
}

function item(c){
  return function(){
    console.log(c);
    sortTable(c);
  }
}
function sortTable(c) {
  var table, rows, switching, i, x, y, shouldSwitch;
  // console.log(c);
  table = document.getElementById("employeeList");
   
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    
    //  console.log(table.rows);
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[c];
      y = rows[i + 1].getElementsByTagName("TD")[c];
      // console.log(x);
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

 
