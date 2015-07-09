// Remove function
function buttonClickRemove()
{
  $('.dialogue').fadeOut('slow');
}

function highlight(ev) {
    $(this).toggleClass('highlighted');  
}

function increaseFont(ev) {
    $(this).animate({fontSize: "1.1em"}, 100);
//    $(this).toggleClass('highlighted');  
}

function decreaseFont(ev) {
    $(this).animate({fontSize: "1em"}, 100);
//    $(this).toggleClass('highlighted');  
}

function buttonClick()
{
    var a = $('body');

    // Get the text from the rounded-button and assign to a header
    var buttonName = $(this).html();
    var headerInfo = $('<div class="dialogue"><h3>' + buttonName + '</h3></div>');

//    var headerInfo = $('<div class="dialogue"><h3>' + buttonName + '</h3></div>');
    // Append the info from .dialogue.
//    a.append(  headerInfo.fadeIn('slow') );
        
    // Append the info from .dialogue.
//    $('.dialogue').on('click', buttonClickRemove); 
}



$(document).on('ready', function(ev)
{
    $('.navigation').on('click', buttonClick) 
                        .on('mouseover', increaseFont)
                        .on('mouseleave', decreaseFont);
//    $('.rounded-button').on('mouseover mouseleave', highlight);
    
    var wrap = $('.fix-header);
    
    wrap.on('scroll', function(err) {
      if (this.scrollTop > 100) {
        wrap.addClass("fix-search");
      } else {
        wrap.removeClass("fix-search");
      }
    });
            
});

// Short hand way to write document ready--just pass in the handler function 
// right into the jQuery object.
// $(function() { 
// });

