$(document).ready(function() {

	var $overlay = $('<div id="gameover-overlay"></div>');
	var $overlayContent = $('<div id="gameover-overlay-content"></div>');
	var $overlayTitle = $('<h1>Game Over!</h1>');
	var $restartButton = $('<button id="restart-btn" class="btn green">Play Again!</button>');

	// Function that updates overlay size
	var resizeOverlay = function () {
		var w = $("html").css("width");
	  	var h = $("html").css("height");
		$overlay.css({
			width: w,
			height: h
		});
	};

  	// Define overlay
	$("body").append($overlay);
	resizeOverlay();
	$overlay.css({
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
		width: "600px",
		height: "250px",
		display: "none",
		margin: "auto",
		"margin-top": "200px",
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
		"color": "#283044",
		"margin-top": "36px",
		"padding": "0px",
		"font-size": "48px"
	});

	$overlayContent.append($restartButton);

	// Shows & hides overlay when help, exit, or anywhere outside the overlay content is clicked
	$("#restart-btn, #gameover-overlay").click(function(event) {
		event.preventDefault();
		resizeOverlay();

		$overlay.fadeToggle();
		$overlayContent.fadeToggle();
	});

	// Resizes the overlay when window is resized
	$(window).resize(function() {
		resizeOverlay();
	});
});