'use strict';

/*
$("#indexedTable").delegate("tr", "click", function(e) {

    var myRowIndex = $(e.currentTarget).index(); 

    console.log('indexed table: ', $(e.currentTarget).index(), '  ', myRowIndex);
});

*/


$(document).ready(function () {
var myRowIndex;

    $("#indexedTable").delegate("tr", "click", function(e) {

    console.log('indexed table: ', $(e.currentTarget).index());
        
    myRowIndex = $(e.currentTarget).index();
});

    console.log('rowInda:  ', myRowIndex);

});

    
