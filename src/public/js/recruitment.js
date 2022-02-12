document.addEventListener("DOMContentLoaded", function () { 
    
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