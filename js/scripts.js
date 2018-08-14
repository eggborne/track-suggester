$(document).ready(function(){
	createTrackCards()
	new Card(0,true)
	$('#start-button').click(function(){
		cards[0].ease("in")
		showOverlay()
		$(this).css({'transform':'translateY(100px)','opacity':'0'})
		userStarted = counter
	})
	$('#start-button-2').click(function(){
		cards[0].ease("in")
		showOverlay()
		$(this).css({'transform':'translateY(60px)','opacity':'0'})
		userStarted = counter
	})
	$('#again-button').click(function(){
		location.reload()
	})
	resultsGraph = new Graph()
	if ($('body').width() <= 600) { 
		$('.track-column').removeClass('col-xs-4')
		$('.track-column').addClass('col-md-4')
	}
	window.requestAnimationFrame(bounceLoop)
	
})
var bouncingElement = "#start-button-2"
var userStarted = -1
var counter = 0
// plan graph height to avoid overflow-y on results page
var graphHeight = window.innerHeight*0.4 // max amount view height can spare
graphHeight > 250 ? graphHeight = 250 : false
graphHeight < 100 ? graphHeight = 100 : false
var gridLayouts = { // each row is [[n,n,n],'height'] where col-md-n
	'graph':[
		[[4,4,4],graphHeight+'px'],
		[[4,4,4],'auto']
	]
}
var trackScores = {}
var cards = []
var generator = new ColumnGenerator()
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
		})
	})
}
function showOverlay() {
	$('#overlay').css({
		'display':'block',
		'pointer-events':'all'
	}).animate({
		'opacity':'1'
	},300)
	$('.container').animate({
		'opacity':'0.2'
	},300)
}
function updateTrackScores(index1,index2) {
	for (var trackKey in tracks) {
		var award = parseInt(tracks[trackKey].weights[index1,index2])
		tracks[trackKey].score += award
	}
}
function createTrackCards() {
	for (var trackKey in tracks) {
		var track = tracks[trackKey]
		//* could loop this for multiple rows
		var currentRow = 0
		$('#track-area').append(`<div id="track-row-`+currentRow+`" class="row track-row">`)
		$('#track-row-'+currentRow).append(`<div class="col-xs-4 track-column">
			<div id="`+trackKey+`-panel" class="panel panel-`+track.color.name+` track-card">
				<div class="panel-body">
						<h4 class="label label-`+track.color.name+`"><strong>`+track.displayName+`</strong></h4>
				</div>
				<div class="panel-body">
					<p>`+track.description+`</p>
				</div>
			</div>
		</div>`)
		//*
	}
}
function Card(index,hide) {
	index = index.toString()
	this.questionObject = questions[index]
	this.divID = "question-card-"+index
	this.html = `<div id="`+this.divID+`" class="panel panel-default question-card"> <div class="panel-heading"> <h3 class="query-text">Question `+(cards.length+1)+` of `+Object.keys(questions).length+`</h3> </div> <div class="panel-body"><h3 class="well">`+this.questionObject.query+`</h3><div class="panel-footer" style="padding-left:5px;padding-right:5px"><button id="left-button-`+index+`" type="button" class="btn btn-success btn-wd left-button">`+this.questionObject.leftResponse.text+`</button> <button id="right-button-`+index+`" type="button" class="btn btn-info btn-wd right-button">`+this.questionObject.rightResponse.text+`</button></div></div>`
	$('#card-area').append(this.html)
	$('#left-button-'+index).click(function(){
		submitResponse(this.id[this.id.length-1],"left")
	})
	$('#right-button-'+index).click(function(){
		submitResponse(this.id[this.id.length-1],"right")
	})
	this.questionObject.cardObject = this
	this.ease = function(direction) {
		if (direction==="in") {
			// start it offscreen above instead of to the right
			$('#'+this.divID).css({"left":"50vw","top":"-100vh"})
			$('#'+this.divID).animate({"top":"0px"},300)
		} else {
			$('#'+this.divID).animate({"top":"-100vh","opacity":"0"},300)
		}
	}
	this.swoop = function(direction) {
		if (direction==="in") {
			$('#'+this.divID).animate({'left':'-=100vw','opacity':'1'},300)
		} else {
			$('#'+this.divID).animate({'left':'-=100vw','opacity':'0'},300)
		}
	}
	cards.push(this)
	!hide ? this.swoop("in") : false
}
function submitResponse(buttonIndex,side) {
	var questionObj = questions[buttonIndex]
	var action = questionObj[side+"Action"]
	action()
}
function getWinner() {
	var trackScores = {}
	for (var trackKey in tracks) {
		trackScores[trackKey] = tracks[trackKey].score
	}
	var sortedScores = Object.values(trackScores).sort(function(a,b){
		return a-b
	})
	for (var trackKey in tracks) {
		if (tracks[trackKey].score===sortedScores[2]) {
			winner = trackKey
		}
	}
	return winner
}
function prepareResultScreen() {
	var winner = getWinner()
	$('#top-blurb').remove()
	$('#title-area').remove()
		var winnerHTML = 
	`<div id="winner-panel">
		<p>Your ideal track is</p>
		<h1 class="label label-`+tracks[winner].color.name+`"><large>`+tracks[winner].displayName+`</h1>
	</div>`
	$('#track-row-0').html(winnerHTML)
	//* remove other rows here if they exist
	$('#start-button-2').html("Try again")
	$('#start-button-2').off().click(function(){
		location.reload()
	})
	resultsGraph.reveal()
}
function Graph() {
	this.html = `<div class="panel panel-lg border-default" id="graph-panel"><div class="panel-body"></div></div>`
	this.insertToDom = function(destination) {
		$(destination).append(this.html)
	}
	this.reveal = function() {
		$('html, body').animate({'scrollTop':0},100);
		$('#graph-panel').show()
		$('#winner-panel').show()
		setTimeout(function(){
			$('#graph-panel').css({'opacity':'1','transform':'scaleX(1) scaleY(1)'})
			bounce("#graph-panel",1.1,2)
			setTimeout(function(){
				resultsGraph.updateBars()
				setTimeout(function(){
					$('#winner-panel').css({'opacity':'1','transform':'scaleX(0) scaleY(0)'})
					setTimeout(function(){
						bounce("#winner-panel",1.1)
						setTimeout(function(){
							$('#start-button-2').css({'transform': 'translateY(0)','opacity':'1'})
						},800)
					},400)
				},350)
			},500)
		},300)
	}
	this.updateBars = function() {
		var totalPoints = 0
		var decimalScores = []
		for (var trackKey in tracks) {
			totalPoints += tracks[trackKey].score/1.4 // magic number to vertically stretch bars
		}
		// get a 0 to 1 value for each score
		for (var trackKey in tracks) {
			var decimal = (tracks[trackKey].score/totalPoints).toPrecision(2)
			if (decimal < 0.05) {
				decimal = 0.05
			}
			decimalScores.push(decimal)
		}
		// set scaleY according to score
		for (var t=0;t<Object.keys(tracks).length;t++) {
			$('#column-0-'+t+' .graph-bar').css({
				'transform':'scaleY('+decimalScores[t]+')'
			})
		}
	}
	// startup actions
	//
	this.insertToDom("#graph-area")
	generator.insertLayout(gridLayouts.graph,'#graph-panel .panel-body')
	for (var trackKey in tracks) {
		var track = tracks[trackKey]
		var index = Object.keys(tracks).indexOf(trackKey)
		// insert bar
		$('#column-0-'+index).html(
			`<div class="graph-bar" style="background-color:`+track.color.hex+`"></div>`
		)
		// insert bar label
		$('#column-1-'+index).html(
			`<p class="label label-`+track.color.name+` graph-label">`+track.displayName+`</p>`
		)
	}
	// set column properties
	$('#graph-panel .generated .generated').css({
		'padding':'10px 0px 10px 0px',
	})
}
function bounce(element,amount) {
	var time = parseFloat($(element).css("transition-duration"))*1000
	$(element).css({
		"transform":"scaleX("+amount+") scaleY("+amount+")"
	})
	setTimeout(function(){
		$(element).css({
			"transform":"scaleX(1) scaleY(1)"
		})
	},time)
}
function bounceLoop() {
	if (counter%60===0) {
		bounce(bouncingElement,1.1)
	}
	if (counter === userStarted) {
		counter = 0
		userStarted = -1
		window.cancelAnimationFrame(bounceLoop)
		// $(bouncingElement).css({'transform':'none'})
		return
	}
	counter++
	window.requestAnimationFrame(bounceLoop)
}
// workaround to overwrite Bootstrap's grid breakpoint
$(window).resize(function(){
	if (window.innerWidth > window.innerHeight) {
		var widthLimit = 500
	} else {
		var widthLimit = 440
	}
  if ($('body').width() <= widthLimit && $('.track-column').hasClass('col-xs-4')) {
		$('.track-column').removeClass('col-xs-4')
		$('.track-column').addClass('col-md-4')
  } else if ($('body').width() > widthLimit && $('.track-column').hasClass('col-md-4')) {
		$('.track-column').removeClass('col-md-4')
		$('.track-column').addClass('col-xs-4')
	}
})