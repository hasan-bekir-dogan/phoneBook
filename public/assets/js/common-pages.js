"use strict";
$('.theme-loader').animate({
    'opacity': '1',
}, 1);


$(window).on('load', function (){
    $('.theme-loader').fadeOut('slow', function() {
        $(this).remove();
    });
});
