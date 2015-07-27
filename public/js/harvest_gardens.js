// From sugar js website
function capitalize(str, all) {
    var lastResponded;
    return str.toLowerCase().replace(all ? /[^']/g : /^\S/, function(lower) {
      var upper = lower.toUpperCase(), result;
      result = lastResponded ? lower : upper;
      lastResponded = upper !== lower;
      return result;
    });
}

$(document).ready(function() {

      // fix menu when passed
      $('.masthead').visibility({
          once: false,
          onBottomPassed: function() {
            $('.fixed.menu').transition('fade in');
          },
          onBottomPassedReverse: function() {
            $('.fixed.menu').transition('fade out');
          }
        });

      // create sidebar and attach to menu open
      $('.ui.sidebar').sidebar('attach events', '.toc.item');

    
      // Read in the inventory and display it.
      var requestURL = "data/inventory_sm3.json";
      $.getJSON(requestURL, null, function(data){

        var items = data.inventory;
        var classificationTypes = [[]];
        var classificationBundle = '';
        var html_snippet = [[]];
        var menuSnippet = '';
        var classificationCount;

          
        // Snipprt strings for creating the product menu.  
          
        // Snipprt strings for displaying items  
        var snippetProduceItemColumn    = '<div class="ten wide column">';
        var snippetProduceItemColumnEnd = '</div>';
        var snippetIconString           = '<h2 class="ui icon header">';
        var snippetIconStringEnd        = '</h2>';
        var snippetProduceItemClassPt1  = '<li class="produceitem" id="';
        var snippetProduceItemClassPt2     = '"><div class="ui grid">';
        var snippetProduceItemClassEnd  = '</div></li>';

        var snippetImageStringStart     = '<div class="three wide column"><img class="image" src="/images/';
        var snippetImageStringEnd       = '_640.jpg" height="60" width="80"></div><div class="eight wide column">';
        var snippetAddToCart = '</div><div class="five wide column"><button class="ui right labeled button">Add to cart</button></div>';
        var snippetRightColumn          = '<div class="six wide column"></div>';
          
          
          
        // Sort the elements by classification, etc. 
        for (var i = 0; i < items.length ; i++) {
            objSort(items, 'classification', 'category', 'sub-category'); 
        }

        // Make array classification types.
        for (var i = 0; i < items.length ; i++) {
            var j;
            if (i == 0) {
                j = 0;
                classificationTypes[j] = items[i].classification;
                j++;
            } else if (items[i].classification != items[i-1].classification){
                classificationTypes[j] = items[i].classification;
                j++;
            }
        }

        // Create html snippet for each classification type.
        for (var j = 0; j < classificationTypes.length ; j++) {
//          html_snippet[j] = snippetProduceItemColumn;
//          html_snippet[j] += snippetIconString;
          classificationCount = 0;
          html_snippet[j] = snippetIconString;
          html_snippet[j] += capitalize(classificationTypes[j], true);
          html_snippet[j] += snippetIconStringEnd;
          html_snippet[j] += '<ul>';
          for (var i = 0; i < items.length ; i++) {
              if (items[i].classification == classificationTypes[j]) {
                classificationCount++;
                html_snippet[j] += snippetProduceItemClassPt1;
                html_snippet[j] += classificationTypes[j];
                html_snippet[j] += snippetProduceItemClassPt2;
                html_snippet[j] += snippetImageStringStart;
                html_snippet[j] += items[i].category;
                html_snippet[j] += snippetImageStringEnd;
                html_snippet[j] += capitalize(items[i].category, true);
                if (items[i].subcategory != 'none') {
                  html_snippet[j] += ', ' + capitalize(items[i].subcategory, true);
                }
                html_snippet[j] += '<h4>Available Units: ' + items[i].unitsavailable + '</h4>';
                html_snippet[j] += '<h4>Unit: ' + items[i].unit + '   $' + items[i].price + '   ';
                html_snippet[j] += '</h4>';
                html_snippet[j] += snippetAddToCart;
                html_snippet[j] += snippetProduceItemClassEnd;
              }
          }
            html_snippet[j] += '</ul>';
            menuSnippet += '<a href="#' + classificationTypes[j] + '" class="item"><div class="ui label">' + classificationCount + '</div>' + capitalize(classificationTypes[j]) + '</a>';
//          html_snippet[j] = snippetProduceItemColumnEnd;
//          html_snippet[j] = snippetRightColumn;
            classificationBundle += html_snippet[j];
        } // End html snippet loop

        // Insert menu snippet
        var $descMenu = $('#productMenu');
        $descMenu.append(menuSnippet);

        // Insert the snippet into the form
        var $desc = $('#existingInventory');
        $desc.append(classificationBundle);

      });

   
});

