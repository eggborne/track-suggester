$(document).ready(function(){
	new Card(0,true)
	$('#start-button').click(function(){
		cards[0].ease("in")
		showOverlay()
	})
	resultsGraph = new Graph()
})
var currentCard
var trackScores = {
	'rails':0,
	'react':0,
	'net':0
}
var gridLayouts = { // each row is [[n,n,n],'height'] where col-md-n
	'graph':[
		[[4,4,4],'250px'],
		[[4,4,4],'']
	]
}
var cards = []
var generator = new ColumnGenerator()
function dismissOverlay() {
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
}
function updateTrackScores(newData) {
	for (var weight in newData) {
		trackScores[weight] += newData[weight]
	}
}
function Card(index,hide) {
	index = index.toString()
	this.questionObject = questions[index]
	this.divID = "question-card-"+index
	this.html = `<div id="`+this.divID+`" class="panel panel-default question-card"> <div class="panel-heading"> <h3>Question `+(cards.length+1)+` of `+Object.keys(questions).length+`</h3> </div> <div class="panel-body"><h3 class="well" style="padding:20px">`+this.questionObject.query+`</h3><div class="panel-footer">  <button id="left-button-`+index+`" type="button" class="btn btn-success btn-wd left-button">`+this.questionObject.leftResponse.text+`</button> <button id="right-button-`+index+`" type="button" class="btn btn-info btn-wd right-button">`+this.questionObject.rightResponse.text+`</button></div></div>`
	$('#card-area').append(this.html)
	$('#left-button-'+index).click(function(){
		var index = this.id[this.id.length-1]
		submitResponse(index,"left")
	})
	$('#right-button-'+index).click(function(){
		var index = this.id[this.id.length-1]
		submitResponse(index,"right")
	})
	this.questionObject.cardObject = this
	this.ease = function(toggle) {
		if (toggle==="in") {
			$('#'+this.divID).css({
				"left":"50vw",
				"top":"-90vh"
			})
			$('#'+this.divID).animate({
				'opacity':'1',
				"top":"10%"
			},300)
		} else {
			$('#'+this.divID).animate({
				'opacity':'0',
				"top":"-90vh"
			},300)
		}
	}
	this.swoop = function(direction) {
		if (direction === "in") {
			$('#'+this.divID).animate({
				'left':'-=100vw',
				'opacity':'1'
			},300)
		} else {
			$('#'+this.divID).animate({
				'left':'-=100vw',
				'opacity':'0'
			},300)
		}
	}
	this.destroy = function() {
		$('#'+this.divID).hide()
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
	$('#'+winner+"-panel").css({
		'border':'9px solid green',
		'transform':'scaleX(1.5) scaleY(1.5)'
	})
	$('#top-blurb').removeClass("well")
	$('#top-blurb').css({"width":"80%","margin-left":"10%"})
	$('#top-blurb').html(`<h3 style="text-align:center;">You seem best suited for</h3>`)
	if (winner==="rails") {
	winnerHTML = 
	`<div class="col-md-3"></div> <div class="col-md-6"> <div id="rails-panel" class="panel panel-danger track-card border-danger"> <div class="panel-heading winner"> <h1 style="text-align:center;font-size:48px"><large>Ruby/Rails</h1> </div> </div> </div> <div class="col-md-3"></div>`
	} else if (winner==="react") {
		winnerHTML = 
		`<div class="col-md-3"></div> <div class="col-md-6"> <div id="react-panel" class="panel panel-warning track-card border-warning"> <div class="panel-heading winner"> <h1 style="text-align:center;font-size:48px">CSS/React</h1> </div> </div> </div> <div class="col-md-3"></div>`
	} else if (winner==="net") {
		winnerHTML = 
		`<div class="col-md-3"></div> <div class="col-md-6"> <div id="net-panel" class="panel panel-success track-card border-success"> <div class="panel-heading winner"> <h1 style="text-align:center;font-size:48px">C#/.NET</h1> </div> </div> </div> <div class="col-md-3"></div>`
	}
	runnerUp==="rails" ? runnerUp = "Ruby/Rails" : runnerUp==="react" ? runnerUp = "CSS/React" : runnerUp==="net" ? runnerUp = "C#/.NET" : false
	$('#track-row').html(winnerHTML)
	
	$('#start-button').html("Try again")
	$('#start-button').off().click(function(){
		location.reload()
	})
	resultsGraph.reveal()
}
function Graph() {
	this.html = 
	`<div class="panel border-default" id="graph-panel">
		<div class="panel-body" style="text-align:center">
		</div> 
	</div>`
	this.insertToDom = function(destination,insertFunction) {
		$(destination)[insertFunction](this.html)
	}
	this.reveal = function() {
		$('#graph-panel').show()
		setTimeout(function(){
			resultsGraph.updateBars()
		},300)
	}
	this.updateBars = function() {
		var totalPoints = 0
		var decimalForms = []
		for (var trackKey in trackScores) {
			totalPoints += trackScores[trackKey]
		}
		// get a 0 to 1 value for each score
		for (var trackKey in trackScores) {
			var decimal = (trackScores[trackKey]/totalPoints).toPrecision(2)
			if (decimal==0.0) {
				decimal = 0.05
			}
			decimalForms.push(decimal)
		}
		// set scaleY according to score
		for (var t=0;t<Object.keys(trackScores).length;t++) {
			$('#column-0-'+t+' .graph-bar').css({
				'transform':'scaleY('+decimalForms[t]+')'
			})
		}
	}
	// startup actions
	this.insertToDom("#track-row","after")
	generator.insertLayout(gridLayouts.graph,'#graph-panel .panel-body')
	// insert bars
	$('#column-0-0').html(
		`<div class="graph-bar" style="background-color:#ff4444"></div>`
	)
	$('#column-0-1').html(
		`<div class="graph-bar" style="background-color:#ffbb33"></div>`
	)
	$('#column-0-2').html(
		`<div class="graph-bar" style="background-color:#00C851"></div>`
	)
	// insert bar labels
	$('#column-1-0').html(
		`<p class="label label-danger graph-label">Ruby/Rails</p>`
	)
	$('#column-1-1').html(
		`<p class="label label-warning graph-label">CSS/React</p>`
	)
	$('#column-1-2').html(
		`<p class="label label-success graph-label">C#/.NET</p>`
	)
	// set column properties
	$('#graph-panel .generated .generated').css({
		'padding':'10px 0px 10px 0px',
	})
}