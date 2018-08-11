var currentCard
var trackScores = {
	'rails':0,
	'react':0,
	'net':0
}
var cards = []
$(document).ready(function(){
	new Card(0,true)
	$('#start-button').click(function(){
		console.log("start clicked! showing " + '#'+cards[0].divID)
		cards[0].ease("in")
		$('#overlay').animate({
			"opacity":1
		},300)
	})
})
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
			console.log("i")
			$('#'+this.divID).animate({
				'opacity':'1',
				"top":"10%"
			},300)
		} else {
			console.log("isdsfdsfdsfdsfsdfdsf")
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
	console.log(trackScores)
	var sortedScores = Object.values(trackScores).sort(function(a,b){
		return a-b
	})
	console.log(sortedScores)
	winner = sortedScores[2]
	runnerUp = sortedScores[1]
	console.log("winner " + winner)
	console.log("2nd --" + runnerUp)
	for (var track in trackScores) {
		if (trackScores[track]===winner) {
			winner = track
		} else if (trackScores[track]===runnerUp) {
			runnerUp = track
		}
	}
	console.log("winner " + winner)
	console.log("2nd " + runnerUp)
	$('#'+winner+"-panel").css({
		'border':'9px solid green',
		'transform':'scaleX(1.5) scaleY(1.5)'
	})
	$('#top-blurb').removeClass("well")
	$('#top-blurb').css({"width":"80%","margin-left":"10%"})
	$('#top-blurb').html(`<h3 style="text-align:center;">Suggestion:</h3>`)
	if (winner==="rails") {
	winnerHTML = 
	`<div class="col-md-3"></div> <div class="col-md-6"> <div id="rails-panel" class="panel panel-danger track-card border-danger"> <div class="panel-heading winner"> <h1 style="text-align:center;font-size:48px"><large>Ruby/Rails</h1 style="text-align:center"> </div> </div> </div> <div class="col-md-3"></div>`
	} else if (winner==="react") {
		winnerHTML = 
		`<div class="col-md-3"></div> <div class="col-md-6"> <div id="react-panel" class="panel panel-warning track-card border-warning"> <div class="panel-heading winner"> <h1 style="text-align:center;font-size:48px">CSS/React</h1 style="text-align:center"> </div> </div> </div> <div class="col-md-3"></div>`
	} else if (winner==="net") {
		winnerHTML = 
		`<div class="col-md-3"></div> <div class="col-md-6"> <div id="net-panel" class="panel panel-success track-card border-success"> <div class="panel-heading winner"> <h1 style="text-align:center;font-size:48px">C#/.NET</h1 style="text-align:center"> </div> </div> </div> <div class="col-md-3"></div>`
	}
	runnerUp==="rails" ? runnerUp = "Ruby/Rails" : runnerUp==="react" ? runnerUp = "CSS/React" : runnerUp==="net" ? runnerUp = "C#/.NET" : false
	$('#track-row').html(winnerHTML)
	$('#track-row').after(`<p style="text-align:center">...but you may also enjoy <strong>`+runnerUp+`.</strong>`)
	$('#start-button').html("Try again")
	$('#start-button').off().click(function(){
		location.reload()
	})
}