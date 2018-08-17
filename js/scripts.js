$(function(){
	createTrackCards();
	stackTracksAtBreakpoint();
	new Card(0,true);
	$('#start-button').click(function(){
		cards[0].ease("in");
		showOverlay();
		$(this).css({'transform':'translateY(60px)','opacity':'0'});
		gUserStarted = gCounter;
	});
	$('#again-button').click(function(){
		location.reload();
	});
	resultsGraph = new Graph();
	setResponseActions();
	bounceLoop();
});
var gBouncingElement = "#start-button";
var gUserStarted = -1;
var gCounter = 0;
// plan graph height to avoid overflow-y on results page
var gGraphHeight = window.innerHeight*0.4; // max amount view height can spare
if (gGraphHeight > 250) {
	gGraphHeight = 250;
} else if (gGraphHeight < 100) {
	gGraphHeight = 100;
}
/**
 * An object whose key-value pairs are the name of a grid layout and an array, 
 * which is passed to ColumnGenerator's .insertLayout() method to provide it with a 'blueprint' to use when creating a grid.
 * Each 'row' of the array corresponds to a grid row and contains:
 * 
 * 1. An array containing one or more integers, which each represent a column and its relative width in the row.
 *    .insertLayout() iterates through it and concatenates its values into the HTML string it produces.
 * 
 * 2. (Optional - default 'auto') A string containing a CSS-compatible height value for the row.
 */
var gGridLayouts = {
	'graph':[
		[[4,4,4],gGraphHeight+'px'],
		[[4,4,4]]
	]
}
var trackScores = {};
var cards = [];
var generator = new ColumnGenerator();
function dismissOverlay() {
	$('.container').animate({
		'opacity':'1'
	},300)
	$('#overlay').animate({
		'opacity':'0'
	},300,function(){ // after
		$('#overlay').css({
			'display':'none',
			'pointer-events':'none'
		});
	});
}
function showOverlay() {
	$('#overlay').css({
		'display':'block',
		'pointer-events':'all'
	}).animate({
		'opacity':'1'
	},300);
	$('.container').animate({
		'opacity':'0.2'
	},300);
}

/**
 * Adds points to track scores according to question and response.
 *
 * @param {number} questionIndex The index of the desired point value array in tracks.weights
 * @param {number} responseIndex The index of the desired point value in tracks.weights[questionIndex]
 */
function updateTrackScores(questionIndex,responseIndex) {
	for (var trackKey in tracks) {
		var award = parseInt(tracks[trackKey].weights[questionIndex][responseIndex]);
		tracks[trackKey].score += award;
	}
}
/**
 * 
 */
function createTrackCards() {
	var currentRow = 0;
	for (var trackKey in tracks) {
		var track = tracks[trackKey]
		//* could loop this for multiple rows
		$('#track-area').append(`<div id="track-row-`+currentRow+`" class="row track-row">`);
		// column breakpoint (usually set by col-xx-4) is handled by window.resize()
		$('#track-row-'+currentRow).append(`<div class="col-xs-4 track-column">
			<div id="`+trackKey+`-panel" class="panel panel-`+track.color.name+` track-card">
				<div class="panel-body">
						<h4 class="label label-`+track.color.name+`"><strong>`+track.displayName+`</strong></h4>
				</div>
				<div class="panel-body">
					<p>`+track.description+`</p>
				</div>
			</div>
		</div>`);
		//*
	}
}
function Card(index,hide) {
	/**
	 * Creates a Bootstrap card to display to the user.
	 *
	 * Inserts values gathered from questions[index] into an HTML string which is then appended to the DOM.
	 * Produces Card() objects with two buttons, and sets their .click() methods.
	 * 
	 * @param {number} index The index questions[i] of the object from which to take question and button text data.
													 Also utilized to give unique ID names to the #question-card-i element and its buttons.

	 * @param {boolean} [hide] Whether to keep the card obscured, rather than call swoop("in") immediately on instantiation.
	 */
	index = index.toString();
	this.questionObject = questions[index];
	this.divID = "question-card-"+index;
	this.html = `<div id="`+this.divID+`" class="panel panel-default question-card"> <div class="panel-heading"> <h3 class="query-text">Question `+(cards.length+1)+` of `+questions.length+`</h3> </div> <div class="panel-body"><h3 class="well">`+this.questionObject.query+`</h3><div class="panel-footer" style="padding-left:5px;padding-right:5px"><button id="left-button-`+index+`" type="button" class="btn btn-success btn-wd left-button">`+this.questionObject.leftResponse.text+`</button> <button id="right-button-`+index+`" type="button" class="btn btn-info btn-wd right-button">`+this.questionObject.rightResponse.text+`</button></div></div>`;
	$('#card-area').append(this.html);
	$('#left-button-'+index).click(function(){
		submitResponse(index,"left"); 
	});
	$('#right-button-'+index).click(function(){
		submitResponse(index,"right");
	});
	this.ease = function(direction) {
		if (direction==="in") {
			$('#'+this.divID).css({"left":"50vw","top":"-100vh"});
			$('#'+this.divID).animate({"top":"0px"},300);
		} else {
			$('#'+this.divID).animate({"top":"-100vh","opacity":"0"},300);
		}
	}
	this.swoop = function(direction) {
		if (direction==="in") {
			$('#'+this.divID).animate({'left':'-=100vw','opacity':'1'},300);
		} else {
			$('#'+this.divID).animate({'left':'-=100vw','opacity':'0'},300);
		}
	}
	cards.push(this);
	if (!hide) {
		this.swoop("in");
	}
}

/**
 * Calls a response's associated .clickAction() method.
 * 
 * @param {number} buttonIndex The index of the clicked answer button's associated question in array 'questions'
 * @param {string} side 			 A string "left" or "right" to be concatenated to "Response"
 */
function submitResponse(buttonIndex,side) {
	var questionObj = questions[buttonIndex];
	var action = questionObj[side+"Response"].clickAction;
	action(buttonIndex);
}

/**
 * Determines the recommended track for the user.
 * 
 * Iterates through 'tracks' to create an object consisting of track:score pairs.
 * Creates an array of the sorted scores.
 * Iterates through 'tracks' again, and selects the key whose .score matches the last member of the sorted score array.
 * 
 * @return {string} The key in object 'tracks' representing the recommended track.
 */
function getWinner() {
	var trackScores = {};
	for (var trackKey in tracks) {
		trackScores[trackKey] = tracks[trackKey].score;
	}
	var sortedScores = Object.values(trackScores).sort(function(a,b){
		return a-b;
	})
	for (var trackKey in tracks) {
		if (tracks[trackKey].score===sortedScores[2]) {
			winner = trackKey;
		}
	}
	return winner;
}
function prepareResultScreen() {
	var winner = getWinner();
	$('#top-blurb').remove();
	$('#title-area').remove();
		var winnerHTML = 
	`<div id="winner-panel">
		<p>Your ideal track is</p>
		<h1 class="label label-`+tracks[winner].color.name+`"><large>`+tracks[winner].displayName+`</h1>
	</div>`;
	$('#track-row-0').html(winnerHTML);
	//* remove other rows here if they exist
	$('#start-button').html("Try again");
	$('#start-button').off().click(function(){
		location.reload();
	})
	resultsGraph.reveal();
}
function Graph() {
	/**
	 * Creates a graph.
	 *
	 * On instantiation of a Graph() object:
	 * 1. Inserts a div #graph-panel to the DOM.
	 * 2. Calls generator.insertLayout() to fill #graph-panel with a Bootstrap grid.
	 * 3. Inserts graph content (bars and labels) using data from the object 'tracks'.
	 * 
	 */
	this.html = `<div class="panel panel-lg border-default" id="graph-panel"><div class="panel-body"></div></div>`;
	this.insertToDom = function(destination) {
		$(destination).append(this.html);
	}
	this.reveal = function() {
		$('html, body').animate({'scrollTop':0},100);
		$('#graph-panel').show();
		$('#winner-panel').show();
		setTimeout(function(){
			$('#graph-panel').css({'opacity':'1','transform':'scaleX(1) scaleY(1)'});
			bounce("#graph-panel",1.1,2);
			setTimeout(function(){
				resultsGraph.updateBars();
				setTimeout(function(){
					$('#winner-panel').css({'opacity':'1','transform':'scaleX(0) scaleY(0)'});
					setTimeout(function(){
						bounce("#winner-panel",1.1);
						setTimeout(function(){
							$('#start-button').css({'transform': 'translateY(0)','opacity':'1'});
						},800);
					},400);
				},350);
			},500);
		},300);
	}
	this.updateBars = function() {
		var totalPoints = 0;
		var decimalScores = [];
		for (var trackKey in tracks) {
			totalPoints += tracks[trackKey].score/1.4; // magic number to vertically stretch bars
		}
		// get a 0 to 1 value for each score
		for (var trackKey in tracks) {
			var decimal = (tracks[trackKey].score/totalPoints).toPrecision(2)
			if (decimal < 0.05) {
				decimal = 0.05;
			}
			decimalScores.push(decimal);
		}
		// set scaleY according to score
		for (var t=0;t<Object.keys(tracks).length;t++) {
			$('#column-0-'+t+' .graph-bar').css({
				'transform':'scaleY('+decimalScores[t]+')'
			});
		}
	}
	// append this.html to the DOM
	this.insertToDom("#graph-area");
	// generate a grid into the graph panel's body
	generator.insertLayout(gGridLayouts.graph,'#graph-panel .panel-body');
	// place bars and labels into the grid with text and colors from the 'tracks' object
	for (var trackKey in tracks) {
		var track = tracks[trackKey];
		var index = Object.keys(tracks).indexOf(trackKey);
		// insert bar
		$('#column-0-'+index).html(
			`<div class="graph-bar" style="background-color:`+track.color.hex+`"></div>`
		);
		// insert bar label
		$('#column-1-'+index).html(
			`<p class="label label-`+track.color.name+` graph-label">`+track.displayName+`</p>`
		);
	}
	// set column properties
	$('#graph-panel .generated .generated').css({
		'padding':'10px 0px 10px 0px',
	});
}
function showResults() {
	dismissOverlay();
	prepareResultScreen();
	resultsGraph.reveal();
}

/**
 * Gives a .clickAction method to question responses in 'questions' object.
 * 
 * Iterates through the 'questions' array and gives each member .leftResponse.clickAction 
 * and .rightResponse.clickAction methods.
 * 
 * Uses the current index i to:
 * 1. Pass the corresponding questionIndex to updateTrackScores().
 * 2. Select the proper Card in 'cards' to swoop/ease out.
 * 3. Instantiate a new Card with data from cards[i+1] (if necessary).
 * 
 */
function setResponseActions() {
	questions.forEach(function(questionObj,i){
		var leftAction, rightAction;
		if (i === questions.length-1) { // last question; ease Card out and call showResults()
			leftAction = function(){
				updateTrackScores(i,0);
				cards[i].ease("out");
				showResults();
			}
			rightAction = function(){
				updateTrackScores(i,1);
				cards[i].ease("out");
				showResults();
			}
		} else { // there are still more questions; swoop Card out and instantiate a new Card
			leftAction = function(){
				updateTrackScores(i,0);
				cards[i].swoop("out");
				new Card(i+1);
			}
			rightAction = function(){
				updateTrackScores(i,1);
				cards[i].swoop("out");
				new Card(i+1);
			}
		}
		questionObj.leftResponse.clickAction = leftAction;
		questionObj.rightResponse.clickAction = rightAction;
	})
}

/**
 * Give an element a bouncing animation.
 * 
 * Alters an element's scaleX and scaleY properties by a specified amount,
 * and then sets them to 1 in a setTimeout() timed to the element's transition-duration CSS property.
 * 
 * @param {Object} element The element to apply the effect to.
 * @param {number} amount  How much the scale should be modified.
 * 
 */
function bounce(element,amount) {
	var time = parseFloat($(element).css("transition-duration"))*1000;
	$(element).css({
		"transform":"scaleX("+amount+") scaleY("+amount+")"
	});
	setTimeout(function(){
		$(element).css({
			"transform":"scaleX(1) scaleY(1)"
		});
	},time);
}

/** 
 * Calls bounce(gBouncingElement) every 1000ms as measured by incrementing counter gCounter.
 * Repeatedly invokes itself via window.requestAnimationFrame() until user clicks Start button.
 */
function bounceLoop() {
	if (gCounter%60===0) {
		bounce(gBouncingElement,1.1);
	}
	if (gCounter === gUserStarted) {
		gCounter = 0;
		gUserStarted = -1;
		window.cancelAnimationFrame(bounceLoop);
		return;
	}
	gCounter++;
	window.requestAnimationFrame(bounceLoop);
}
/**
* Overrides Bootstrap's responsive column stacking for .track-column members by
	swapping col-XX-4 for one that will stack/unstack at the desired breakpoint.
 */
function stackTracksAtBreakpoint() {
	
	if (window.innerWidth > window.innerHeight) {
		var widthLimit = 500;
	} else {
		var widthLimit = 440;
	}
  if ($('body').width() <= widthLimit && $('.track-column').hasClass('col-xs-4')) {
		// col-md will immediately cause this width to stack
		$('.track-column').removeClass('col-xs-4');
		$('.track-column').addClass('col-md-4'); 
  } else if ($('body').width() > widthLimit && $('.track-column').hasClass('col-md-4')) {
		// col-xs will immediately cause this width to unstack
		$('.track-column').removeClass('col-md-4');
		$('.track-column').addClass('col-xs-4'); 
	}
}
$(window).resize(function(){
	stackTracksAtBreakpoint()
});