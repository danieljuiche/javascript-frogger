$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out-left',
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

  var typeSpeed = 65;

  var showChoices = function () {
    $('.choice-container').fadeIn(2000);
  };

  var showTear = function () {
    var tear = $('.tear');
    tear.animate({
      top: 50,
      opacity: 100
    },1500);  
  };

  var showCharacter = function () {
    var sadSpot = $('#sad');
    sadSpot.fadeIn(1200);
  };

  var speech2 = function () {
    var text = " Besides being a selective listener,";
    $('#speech2').typeTo(text);
    setTimeout(speech3, typeSpeed * text.length + 500);
  };

  var speech3 = function () {
    var text = " I also suffer from short term memory loss...";
    $('#speech3').typeTo(text);
    setTimeout(showChoices, typeSpeed * text.length + 500);
    setTimeout(function () {
      showCharacter();
      showTear();
    }, typeSpeed * text.length / 2 + 1200);
  };

  setTimeout(function () {
    $(function () {
      var text = "Thank you so much for agreeing to help me!";
      $('#speech1').typeTo(text);
      setTimeout(speech2, typeSpeed * text.length + 500);
    });
  }, 300);
});