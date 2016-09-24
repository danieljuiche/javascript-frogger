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
		width: "600px",
		height: "800px",
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
		"margin-top": "-65px",
		"margin-right": "12px",
		"margin-bottom": "0px",
		"margin-left": "0px",
		"font-size": "24px"
	});

	// Overlay Content
	$overlayContent.append("<p>This frogger game was made as the final project for Udacity's\
	<a href='https://www.udacity.com/course/object-oriented-javascript--ud015'>Object-Oriented Javascript</a> course.</p>");

	$overlayContent.append("<p>Use the arrow keys to move your character around. Cross the river, collect items and unlock new characters!</p>");

	$overlayContent.append("<p>Click <a href='#'>here</a> to watch the introduction.</p>");

	$overlayContent.append('<p>*Note* This game works best on a 1920 x 1080 screen. \
	If you are playing on a smaller screen please adjust your window resolution by holding down the &lt;CTRL&gt; key \
	and scrolling downwards on the &lt;MOUSEWHEEL&gt;');

	$overlayContent.append('<p>Please help out by sending any errors and bug reports to <a href="mailto:munie.l2p@gmail.com?Subject=Bug%20Report" target="_top">munie.l2p@gmail.com</a>.')

	$overlayContent.append('<p>If you enjoyed the game, please consider donating! Every dollar is very much appreciated.</p>');
	$overlayContent.append('<a id="donate" class="link" target="_blank" rel="noopener nofollow" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=6KBWFDB4C3EA4"><img src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/gold-pill-paypal-26px.png"></a>')

	// CSS for content in overlay
	$overlayContent.children().each(function () {
		$("p").css({
			width: "75%",
			margin: "auto",
			"margin-top": "1.5em",
			"margin-bottom": "1.5em",
			"text-align": "left",
			display: "block",
			color: "black",
			"font-size": "1em"
		});
	});

	// Shows & hides overlay
	$("#btn-info, #btn-exit, #overlay").click(function(event) {
		event.preventDefault();
		$overlay.toggle();
		$overlayContent.toggle();
	});

});