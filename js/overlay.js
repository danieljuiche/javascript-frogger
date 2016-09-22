$(document).ready(function() {
	var $overlay = $('<div id="overlay"></div>');
	var $overlayContent = $('<div id="overlay-content"></div>');
	var $overlayTitle = $('<h1>About</h1>');
	var $exitButton = $('<div><a id="btn-exit" href="#"><i class="fa fa-times-circle-o" aria-hidden="true"></a></i></div>')
	var w = $("html").css("width");
  var h = $("html").css("height");

  // Define overlay
	$("body").append($overlay);
	$overlay.css({
		width: w,
		height: h,
		display: "none",
		background: "rgba(0,0,0,0.7)",
		position: "absolute",
		top: "0",
		left: "0",
		"z-index": "1"
	});

	// Overlay content
	$("body").append($overlayContent);
	$overlayContent.css({
		background: "white",
		width: "700px",
		height: "900px",
		display: "none",
		margin: "auto",
		"margin-top": "50px",
	  position: "absolute", 
	  left: "0",
	  right: "0",
	  top: "0",
	  bottom: "0",
		"z-index": "100",
		"border-radius": "10px"

	});

	// Overlay title
	$overlayContent.append($overlayTitle);
	$overlayTitle.css({
		"color": "#505A5B",
		"margin-top": "7px"
	});

	// Exit button for overlay
	$overlayContent.append($exitButton);
	$exitButton.css({
		"float": "right",
		"margin-top": "-60px",
		"margin-right": "10px",
		"margin-bottom": "0px",
		"margin-left": "0px",
		"font-size": "24px"
	});

	$("#overlayContent").click(function(event) {
		event.stopPropagation();
	});

	// Shows & hides overlay
	$("#btn-info, #btn-exit, #overlay").click(function(event) {
		event.preventDefault();
		console.log($(this));
		if ($(this).is("#overlay-content")) {
			console.log("OVERLAY CONTENT CLICKED");
		}
		$overlay.toggle();
		$overlayContent.toggle();
	});



});