$(document).ready(function(){
	createTrackCards()
	new Card(0,true)
	$('#start-button').click(function(){
		cards[0].ease("in")
		showOverlay()
		$(this).css({'transform':'translateY(100px)','opacity':'0'})
	})
	resultsGraph = new Graph()
})
var ticker = 0
var trackScores = {
	'rails':0,
	'react':0,
	'net':0
}
var gridLayouts = { // each row is [[n,n,n],'height'] where col-md-n
	'graph':[
		[[4,4,4],'230px'],
		[[4,4,4],'auto']
	]
}
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
function updateTrackScores(newData) {
	for (var weight in newData) {
		trackScores[weight] += newData[weight]
	}
}
function createTrackCards() {
	for (var trackKey in tracks) {
		var track = tracks[trackKey]
		$('#track-row').append(`<div class="col-sm-4">
			<div id="`+trackKey+`-panel" class="panel panel-`+track.color.name+` track-card">
				<div class="panel-heading">
						<h4><strong>`+track.displayName+`</strong></h4>
				</div>
				<div class="panel-body">
					<p>`+track.description+`</p>
				</div>
			</div>
		</div>`)
	}
}
function Card(index,hide) {
	index = index.toString()
	this.questionObject = questions[index]
	this.divID = "question-card-"+index
	this.html = `<div id="`+this.divID+`" class="panel panel-default question-card"> <div class="panel-heading"> <h3 style="font-size:18px;color:#555;margin-top:5px;margin-bottom:5px">Question `+(cards.length+1)+` of `+Object.keys(questions).length+`</h3> </div> <div class="panel-body"><h3 style="font-size:18px" class="well">`+this.questionObject.query+`</h3><div class="panel-footer" style="padding-left:5px;padding-right:5px"><button id="left-button-`+index+`" type="button" class="btn btn-success btn-wd left-button">`+this.questionObject.leftResponse.text+`</button> <button id="right-button-`+index+`" type="button" class="btn btn-info btn-wd right-button">`+this.questionObject.rightResponse.text+`</button></div></div>`
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
			$('#'+this.divID).css({"left":"50vw","top":"-90vh"})
			$('#'+this.divID).animate({"top":"0px"},300)
		} else {
			$('#'+this.divID).animate({"top":"-90vh"},300)
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
function produceResult() {
	var sortedScores = Object.values(trackScores).sort(function(a,b){
		return a-b
	})
	winner = sortedScores[2]
	runnerUp = sortedScores[1]
	for (var track in trackScores) {
		if (trackScores[track]===winner) {
			winner = track
		} else if (trackScores[track]===runnerUp) {
			runnerUp = track
		}
	}
	$('#top-blurb').remove()
	$('#title-area').remove()
		winnerHTML = 
	`<div id="winner-panel">
		<p>Your ideal track is</p>
		<h1 class="label label-`+tracks[winner].color.name+`"><large>`+tracks[winner].displayName+`</h1>
	</div>`
	$('#track-row').html(winnerHTML)
	$('#start-button').html("Try again")
	$('#start-button').off().click(function(){
		location.reload()
	})
	resultsGraph.reveal()
}
function Graph() {
	this.html = `<div class="panel border-default" id="graph-panel"><div class="panel-body" style="text-align:center"></div></div>`
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
					$('#start-button').css({'transform': 'translateY(0)','opacity':'1'})
					setTimeout(function(){
						bounce("#winner-panel",1.1)
					},400)
				},350)
			},500)
		},300)
	}
	
	this.updateBars = function() {
		var totalPoints = 0
		var decimalScores = []
		for (var trackKey in trackScores) {
			totalPoints += trackScores[trackKey]/1.4 // magic number to vertically stretch bars
		}
		// get a 0 to 1 value for each score
		for (var trackKey in trackScores) {
			var decimal = (trackScores[trackKey]/totalPoints).toPrecision(2)
			if (decimal==0.0) {
				decimal = 0.05
			}
			decimalScores.push(decimal)
		}
		// set scaleY according to score
		for (var t=0;t<Object.keys(trackScores).length;t++) {
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