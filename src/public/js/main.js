

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
    var swiper = new Swiper(".benefit-swiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        breakpoints: {
            // when window width is >= 0px
            0: {
            
              slidesPerView: 1,
              spaceBetween: 10
            },
            // when window width is >= 600px
            600: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
                spaceBetween: 30
              },
          }
      });
    

    
    
      var swiper2 = new Swiper(".testimonials-swiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    
  });

  const mainTitle = $('#main-title')
  const smallTitle = $('#small-title')
  const headerBtnBox = $('.header-btn-box')
  

  const product1 = $('#product-1')
  const product2 = $('#product-2')
  const product3 = $('#product-3')
  const product4 = $('#product-4')
  const product5 = $('#product-5')
  
  window.onload = function () { 
    
    
    mainTitle.addClass('fade-from-bottom')
    smallTitle.addClass('fade-from-bottom')
    headerBtnBox.addClass('fade-from-bottom')
    
  }

  const productContainer = $('.product-container')
  const benefitContainer = $('.benefit-container')

  $(window).on('scroll', check_if_in_view);
    function check_if_in_view() {
        var window_height = $(window).height();
        var window_top_position = $(window).scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        
        
            var $element = benefitContainer;
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
        
            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
            
            $element.addClass('benefit-fade-in');
            } else {
            $element.removeClass('benefit-fade-in');
            }
            

            var $element2 = productContainer;
            var element_height = $element2.outerHeight();
            var element_top_position = $element2.offset().top;
            var element_bottom_position = (element_top_position + element_height);
        
            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                    product1.addClass('fade-from-bottom')
                    product2.addClass('fade-from-bottom')
                    product3.addClass('fade-from-bottom')
                    product4.addClass('fade-from-bottom')
                    product5.addClass('fade-from-bottom')
            } else {
                product1.removeClass('fade-from-bottom')
                    product2.removeClass('fade-from-bottom')
                    product3.removeClass('fade-from-bottom')
                    product4.removeClass('fade-from-bottom')
                    product5.removeClass('fade-from-bottom')
            }
    }

    function slideToProduct(){

        $('html, body').animate({
            scrollTop: $(".product-container").offset().top -200
        }, 1000);
    }
    
    function showSignUp() {
        
        
        
        $('#sign-up-hidden').addClass('sign-up-show')
        
    }
    
    $(document).mouseup(function(e) 
    {
        var container = $('#sign-up-hidden');

        // if the target of the click isn't the container nor a descendant of the container
        if (container.is(e.target)) 
        {
            container.removeClass('sign-up-show');
        }
    });