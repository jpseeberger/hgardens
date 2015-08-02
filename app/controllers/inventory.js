'use strict';


$(document).ready(function () {
	
  var requestURL = "data/inventory_sm3.json";
  $.getJSON(requestURL, null, function(data){
    var items = [];
    var fieldWidth = 'two';
    var html_snippet = '';

    $.each( data, function( ob, el ) {
      // Sort the elements by classification, etc. before creating
      // the html snippet for insertion into inventory form
      for (var i = 0; i < el.length ; i++) {
        objSort(el, 'classification', 'category', 'subcategory'); 
      }
      // Loop to create html snippet
      for (var i = 0; i < el.length ; i++) {
        html_snippet += '<div class="fields">';
        $.each( el[i], function( key, val ) {
          // Set the width of the individual columns
          switch(key){
            case 'photo':
              fieldWidth = 'one';
              break;
            case 'subcategory':
              fieldWidth = 'three';
              break;
            default:
              fieldWidth = 'two';
          }
          html_snippet += '<div class="' + fieldWidth + ' wide field">';
          html_snippet += '<input type="text" name="' + key + '" placeholder="'  + val +'">';
          html_snippet += '</div>';
        });
        html_snippet += '</div>';
      } // End html snippet loop
    });

    // Insert the snippet into the form
	var $desc = $('#existingInventory');
    $desc.append(html_snippet);

  });
                
});

    
