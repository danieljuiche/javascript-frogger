$(document).ready(function() {

	var $overlay = $('<div id="overlay"></div>');
	var $overlayContent = $('<div id="overlay-content"></div>');
	var $overlayTitle = $('<h1>Frogger Clone</h1>');
	var $exitButton = $('<div><a id="btn-exit" href="#"><i class="fa fa-times-circle-o" aria-hidden="true"></a></i></div>')
	var $socialMedia = $('<div id="social-container"></div>');
	var $gitHubContainer = $('<div class="container"></div>');
	var $gitHubStar = $('<a class="github-button" href="https://github.com/danieljuiche/javascript-frogger" data-icon="octicon-star" data-count-href="/danieljuiche/javascript-frogger/stargazers" data-count-api="/repos/danieljuiche/javascript-frogger#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star danieljuiche/javascript-frogger on GitHub">Star</a>');
	var $gitHubFork = $('<a class="github-button" href="https://github.com/danieljuiche/javascript-frogger/fork" data-icon="octicon-repo-forked" aria-label="Fork danieljuiche/javascript-frogger on GitHub">Fork</a>');
	var $gitHubFollow = $('<a class="github-button" href="https://github.com/danieljuiche" aria-label="Follow @danieljuiche on GitHub">Follow @danieljuiche</a>');

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
		height: "750px",
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
		"color": "#283044",
		"margin-top": "36px",
		"padding": "0px"
	});

	// Exit button for overlay
	$overlayContent.append($exitButton);
	$exitButton.css({
		"float": "right",
		"margin-top": "-62px",
		"margin-right": "24px",
		"margin-bottom": "0px",
		"margin-left": "0px",
		"font-size": "36px"
	});

	// Overlay Content
	$overlayContent.append("<h2>How to Play</h2>");
	$overlayContent.append("<h4>Use the &#8592;, &#8593;, &#8594; &#8595; arrow keys to move your character around. Collect points by crossing the river and collecting items!");

	$overlayContent.append('<h4>*Note*: This game works best on a <span style="color: red"><u>1920 x 1080</u></span> screen. Please adjust your browser window view for the optimal experience.</h4>');

	$overlayContent.append("<h2>Unlockable Characters</h2>");
	$overlayContent.append("<h4>Reaching certain checkpoints in the game will unlock more characters. Each will have their own special powers, click their name on the right to switch to them.");

	$overlayContent.append("<h2>Misc</h2>");
	$overlayContent.append("<h4>If you want to watch the full gameplay introduction, please click <a href='http://danieljuiche.com/proj/frogger/intro1.html'>here</a>.</h4>");

	// Adds social media container
	$overlayContent.append($socialMedia);

	// Add github container to social media container
	$socialMedia.append($gitHubContainer);
	$gitHubContainer.append($gitHubStar);
	$gitHubContainer.append($gitHubFork);
	$gitHubContainer.append($gitHubFollow);

	// CSS for content in overlay
	$overlayContent.children("h1").css({
		"color": "#805341"
	});

	$overlayContent.children("h2").css({
		"width": "75%",
		"margin": "auto",
		"margin-top": "1em",
		"margin-bottom": "0.5em",
		"text-align": "left",
		"display": "block",
		"color": "#805341"
	});

	$overlayContent.children("h4").css({
		"font-size": "18px",
		"width": "75%",
		"margin": "auto",
		"margin-top": "1.2em",
		"margin-bottom": "1.2em",
		"text-align": "left",
		"display": "block",
	});

	// CSS for social media containers
	$('#social-container').css({
		"margin": "auto",
		"margin-top": "15px",
		"width": "75%",
	});

	// Github button script
	$('body').append('<script async defer src="https://buttons.github.io/buttons.js"></script>');

	// Shows & hides overlay when help, exit, or anywhere outside the overlay content is clicked
	$("#btn-info, #btn-exit, #overlay").click(function(event) {
		event.preventDefault();
		resizeOverlay();

		$overlay.fadeToggle();
		$overlayContent.fadeToggle();
	});

	// Resizes the overlay when window is resized
	$(window).resize(function() {
		resizeOverlay();
	});

	// Short-cut for viewing help menu
	$(window).keypress(function(event) {
		if (event.key === "h") {
			$overlay.fadeToggle();
			$overlayContent.fadeToggle();
		}
	});

	// Load the overlay and contents when game first starts
	$overlay.toggle();
	$('#overlay-content').fadeIn(800,"linear");
});