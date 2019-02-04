
var app = {
  particles:function() {
       window.onload = function() {

            Particles.init({
              
            // normal options
              selector: '.background',
              color:'#616161c9',
              maxParticles: 250,
              connectParticles: false,
              
            // options for breakpoints
            //   responsive: [
            //     {
            //       breakpoint: 868,
            //       options: {
            //         maxParticles: 130,
            //         // color:'#d8d8d8',
            //         connectParticles: false
            //       }
            //     }, {
            //       breakpoint: 425,
            //       options: {
            //        maxParticles: 130,
            //         // color:'#d8d8d8',
            //         connectParticles: false
            //       }
            //     }, {
            //       breakpoint: 320,
            //       options: {
            //         maxParticles: 130
             
            // // disables particles.js
            //       }
            //     }
            //   ]
            });
      };

  
    },
  ripple:function() {
    $('.navbar-right a').click(function(){
        $('.navbar-collapse.collapse').removeClass('in')
    })
    $('a[href*=\\#]').on('click', function(event){     
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 900);
        });
        window.onscroll = function() {myFunction()};

        var header = document.getElementById("navbar");
        var sticky = header.offsetTop;

        function myFunction() {
          if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            header.classList.add("navbar-fixed-top");
            $(header).removeClass('navbar-static-top')
            $(header).addClass('bag_white animated fadeInDown')
          } else {
            $(header).removeClass('navbar-fixed-top')
             // $(header).addClass('bag_white')
             $(header).removeClass('bag_white animated fadeInDown')
              header.classList.add("navbar-static-top");
          }
        }
    
    },

    bigger:function(){
        (function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});
    }
};//end app

