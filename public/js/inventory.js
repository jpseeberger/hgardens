'use strict';


$("#indexedTable").delegate("tr", "click", function(e) {

  var tableRowId = '';
  tableRowId += $(e.currentTarget).index(); 
  console.log('indexed table1: ', $(e.currentTarget).index(), '  ', tableRowId);

  $("#editTableItem").attr("action", "/inventory/:" + tableRowId);
  $("#deleteTableItem").attr("action", "/inventory/:" + tableRowId + "/delete");

        
});

