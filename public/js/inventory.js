'use strict';

/*Object sorting function from stackoverflow
  Usage:
  objSort(object, 'key') --> sort by key (ascending, case in-sensitive)
  objSort(object, 'key', true) --> sort by key (ascending, case sensitive)
  objSort(object, ['key', true]) --> sort by key (descending, case in-sensitive)
  objSort(object, 'key1', 'key2') --> sort by key1 then key2 (both ascending, case in-sensitive)
  objSort(object, 'key1', ['price', true]) --> sort by key1 (ascending) then key2 (descending), case in-sensitive)
*/
function objSort() {
  var args = arguments,
    array = args[0],
    case_sensitive, keys_length, key, desc, a, b, i;

  if (typeof arguments[arguments.length - 1] === 'boolean') {
    case_sensitive = arguments[arguments.length - 1];
    keys_length = arguments.length - 1;
  } else {
    case_sensitive = false;
    keys_length = arguments.length;
  }

  return array.sort(function (obj1, obj2) {
    for (i = 1; i < keys_length; i++) {
      key = args[i];
      if (typeof key !== 'string') {
        desc = key[1];
        key = key[0];
        a = obj1[args[i][0]];
        b = obj2[args[i][0]];
      } else {
        desc = false;
        a = obj1[args[i]];
        b = obj2[args[i]];
      }
      if (case_sensitive === false && typeof a === 'string') {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      if (! desc) {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
      }
    }
    return 0;
  });
} //end of objSort() function


$(document).ready(function () {
	
  var requestURL = "data/inventory_sm2.json";
  $.getJSON(requestURL, null, function(data){
    var items = [];
    var fieldWidth = 'two';
    var html_snippet = '';

    $.each( data, function( ob, el ) {
      // Sort the elements by classification, etc. before creating
      // the html snippet for insertion into inventory form
      for (var i = 0; i < el.length ; i++) {
        objSort(el, 'classification', 'category', 'sub-category'); 
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
            case 'sub-category':
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
	var $desc = $('#existing-inventory');
    $desc.append(html_snippet);

  });
                
});

    
