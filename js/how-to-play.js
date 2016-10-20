$(document).ready(function() {
  // Settings for the animsition plugin
  $(".animsition").animsition({
    inClass: 'zoom-in',
    outClass: 'zoom-out',
    inDuration: 500,
    outDuration: 500,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });

  // Settings for the slick plugin
  $('.main').slick({
    infinite: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnFocus: false,
    pauseOnHover: false
  });

  // Turn off auto play after user clicks on button
  $('.slick-next').click(function () {
    $('.main').slick("slickSetOption", "autoplay", false, false);
  });

  $('.slick-prev').click(function () {
    $('.main').slick("slickSetOption", "autoplay", false, false);
  });

  var autoPlayInterval = function () {
    setInterval(function() {
    var currentSlide = $('.main').slick("slickCurrentSlide");
      if (currentSlide === 8) {
        $('.main').slick("slickSetOption","autoplay",false,false);
        window.clearInterval(autoPlayInterval);
      }
    },0);
  }
  autoPlayInterval();

});