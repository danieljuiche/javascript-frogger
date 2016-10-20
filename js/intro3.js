$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in-left',
    outClass: 'fade-out-right',
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

  var speech2 = function () {
    var text = " We all suffer from Entomophobia,";
    $('#speech2').typeTo(text);
    setTimeout(speech3, typeSpeed * text.length + 200);
  };

  var speech3 = function () {
    var text = " which means we are deathly afraid of bugs.";
    $('#speech3').typeTo(text);
    setTimeout(speech4, typeSpeed * text.length + 500);
  };

  var speech4 = function () {
    var text = " Literally!";
    $('#speech4').typeTo(text);
    setTimeout(showChoices, typeSpeed * text.length + 500);
  }

  setTimeout(function () {
    $(function () {
      var text = "My friends and I share a common trait.";
      $('#speech1').typeTo(text);
      setTimeout(speech2, typeSpeed * text.length + 500);
    });
  }, 300);
});