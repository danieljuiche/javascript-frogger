$(document).ready(function() {

	var $overlay = $('<div id="overlay"></div>');
	var $overlayContent = $('<div id="overlay-content"></div>');
	var $overlayTitle = $('<h1>About</h1>');
	var $exitButton = $('<div><a id="btn-exit" href="#"><i class="fa fa-times-circle-o" aria-hidden="true"></a></i></div>')
	var $socialMedia = $('<div id="social-container"></div>');
	var $facebookContainer = $('<div class="container"></div>');
	var $gitHubContainer = $('<div class="container"></div>');
	var $gitHubStar = $('<a class="github-button" href="https://github.com/danieljuiche/javascript-frogger" data-icon="octicon-star" data-count-href="/danieljuiche/javascript-frogger/stargazers" data-count-api="/repos/danieljuiche/javascript-frogger#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star danieljuiche/javascript-frogger on GitHub">Star</a>');
	var $gitHubFork = $('<a class="github-button" href="https://github.com/danieljuiche/javascript-frogger/fork" data-icon="octicon-repo-forked" aria-label="Fork danieljuiche/javascript-frogger on GitHub">Fork</a>');
	var $gitHubFollow = $('<a class="github-button" href="https://github.com/danieljuiche" aria-label="Follow @danieljuiche on GitHub">Follow @danieljuiche</a>');
	var $facebookLikes = $('<iframe id="fb-likes" src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fd1q58s3xarm9sx.cloudfront.net%2F&width=104&layout=button_count&action=like&show_faces=false&share=true&height=46&appId" width="104" height="46" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');
	var $facebookFollow = $('<iframe id="fb-follow" src="https://www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2Fdaniel.juiche&width=64&height=65&layout=button&size=small&show_faces=false&appId" width="64" height="65" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');
	var $linkedinContainer = $('<div class="container"></div>');
	var $linkedinProfile = $('<a id="linkedin-profile" href="https://www.linkedin.com/in/danieljuiche"><i class="fa fa-linkedin-square" aria-hidden="true"></i> Daniel Lin</a>')

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
		"color": "#283044",
		"margin-top": "36px",
		"padding": "0px"
	});

	// Exit button for overlay
	$overlayContent.append($exitButton);
	$exitButton.css({
		"float": "right",
		"margin-top": "-62px",
		"margin-right": "11px",
		"margin-bottom": "0px",
		"margin-left": "0px",
		"font-size": "24px"
	});

	// Overlay Content
	$overlayContent.append("<h3>Introduction</h3>");
	$overlayContent.append("<h5>This frogger game was made as the final project for Udacity's\
	<a href='https://www.udacity.com/course/object-oriented-javascript--ud015'>Object-Oriented Javascript</a> course. \
	I am very excited to share it with you all and I hope you will enjoy the game as much as I did making it!</h5>");

	$overlayContent.append("<h3>Gameplay</h3>");
	$overlayContent.append("<h5>Use the &lt;ARROW KEYS&gt; to move your character around. Cross the river, collect items \
	and unlock new characters! If you need to watch the introduction again, click <a href='https://d3to3yv00lc87b.cloudfront.net/'>here</a>.</h5>");

	$overlayContent.append('<h5>*Note* This game works best on a 1920 x 1080 screen. You may adjust your \
	browser resolution by holding down the &lt;CTRL&gt; key and scrolling upwards or downwards with the \
	&lt;MOUSEWHEEL&gt;</h5>');

	$overlayContent.append("<h3>Misc</h3>");
	$overlayContent.append('<h5>Please send any comments, suggestions or bug reports to <a href="mailto:daniel.juiche@gmail.com?Subject=Bug%20Report" target="_top">munie.l2p@gmail.com</a>. \
		I would very much like to hear your input! You can also find me via any of the social media platforms below.</h5>');

	// Adds social media container
	$overlayContent.append($socialMedia);

	// Add facebook container to social media container
	$socialMedia.append($facebookContainer);
	$facebookContainer.append($facebookLikes);
	$facebookContainer.append($facebookFollow);

	// Add github container to social media container
	$socialMedia.append($gitHubContainer);
	$gitHubContainer.append($gitHubStar);
	$gitHubContainer.append($gitHubFork);
	$gitHubContainer.append($gitHubFollow);

	// Add linkedin container to social media container
	$socialMedia.append($linkedinContainer);
	$linkedinContainer.append($linkedinProfile);

	// Adjust linkedin button
	$(".fa-linkedin-square").css({
		"margin-top": "3px",
		"font-size": "16px",
		"color": "rgba(26,133,188,1)"
	});

	$("#linkedin-profile").css({
		"color": "#000",
		"border-style": "solid",
		"border-color": "#000",
		"border-width": "1px",
		"padding-left": "5px",
		"padding-right": "5px",
		"height": "20px",
		"box-sizing": "border-box",
		"font-size": "12px",
		"text-decoration": "none"
	});

	$overlayContent.append("<h3>Donations?</h3>");
	$overlayContent.append('<h5>Please help support my coffee addiction.</h5>');
	$overlayContent.append('<a id="donate" class="link" target="_blank" rel="noopener nofollow" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=6KBWFDB4C3EA4"><img src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/gold-pill-paypal-26px.png"></a>');

	// CSS for content in overlay
	$overlayContent.children("h3").css({
			"width": "75%",
			"margin": "auto",
			"margin-top": "1em",
			"margin-bottom": "0.5em",
			"text-align": "left",
			"display": "block",
			"color": "#805341"
		});

	$overlayContent.children("h5").css({
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

		$overlay.toggle();
		$overlayContent.toggle();
	});

	// Resizes the overlay when window is resized
	$(window).resize(function() {
		resizeOverlay();
	});

	// Short-cut for viewing help menu
	$(window).keypress(function(event) {
		if (event.key === "h") {
			$overlay.toggle();
			$overlayContent.toggle();
		}
	});
});