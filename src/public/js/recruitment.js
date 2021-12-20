document.addEventListener("DOMContentLoaded", function () { 
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
         //>=, not <=
        if (scroll > 0) {
           
            //clearHeader, not clearheader - caps H
            
            $(".pc-nav").addClass("smaller-padding");
            $(".small-nav").addClass("smaller-padding");
        }else {
           
            $(".pc-nav").removeClass("smaller-padding");
            $(".small-nav").removeClass("smaller-padding");
        }
    }); //missing );
    const smallNavMenu = $('.nav-icon-box')
    smallNavMenu.click(() =>{
    if(smallNavMenu.hasClass('is-open')){
        smallNavMenu.removeClass('is-open')
    }else{
        smallNavMenu.addClass('is-open')
    }
    })

    $('.form-items').submit(function(event) {

        event.preventDefault(); //this will prevent the default submit
       
        alert('Gửi thông tin thành công.')
         
        $(this).unbind('submit').submit(); // continue the submit unbind preventDefault
       })
})