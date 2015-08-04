module.exports = objSort;
module.exports = capitalize;


'use strict';

function capitalize(str, all) {
    var lastResponded;
    return str.toLowerCase().replace(all ? /[^']/g : /^\S/, function(lower) {
      var upper = lower.toUpperCase(), result;
      result = lastResponded ? lower : upper;
      lastResponded = upper !== lower;
      return result;
    });
}


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

