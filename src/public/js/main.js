document.addEventListener("DOMContentLoaded", function () {
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
         //>=, not <=
        if (scroll > 0) {
           
            //clearHeader, not clearheader - caps H
            
            $(".pc-nav").addClass("smaller-padding");
        }else {
           
            $(".pc-nav").removeClass("smaller-padding");
        }
    }); //missing );
  });
