var currentCard
var totals = {
	rails:0,
	react:0,
	net:0
}
var cards = []
$(document).ready(function(){
	currentCard = new Card(0,true)
	$('#start-button').click(function(){
		console.log("start clicked!")
		$('#'+currentCard.divID).show()
		$('#overlay').show();
	})
	$('.left-button').click(function(){
		var index = this.id[this.id.length-1]
		console.log("index " + index)
		
		submitResponse(index,"left")
	})
	$('.right-button').click(function(){
		var index = this.id[this.id.length-1]
		submitResponse(index,"right")
	})
})
function updateTotals(newData) {
	for (weight in newData) {
		console.log(newData[weight])
		totals[weight] += newData[weight]
	}
	console.log(totals)
}
function Card(index,hide) {
	this.questionObject = questions[index]
	this.divID = "question-card-"+index
	this.html = `<div id="`+this.divID+`" class="panel panel-default question-card"> <div class="panel-heading"> <h2>`+this.questionObject.query+`</h2> </div> <div class="panel-body"> <img class="question-image-`+index+`" src="img/placeholder0.png" alt="A snazzy relevant image"></img> <div class="btn-group" role="group"> <button id="left-button-`+index+`" type="button" class="btn btn-success btn-wd left-button">`+this.questionObject.leftResponse.text+`</button> <button id="right-button-`+index+`" type="button" class="btn btn-danger btn-wd right-button">`+this.questionObject.rightResponse.text+`</button> </div> </div> </div>`
	$('#card-area').html('')
	$('#card-area').html(this.html)
	this.questionObject.cardObject = this
	cards.push(this)
	!hide ? this.easeIn() : false
}
Card.prototype.easeIn = function() {
	$('#'+this.divID).fadeIn()
}
Card.prototype.destroy = function() {
	$('#'+this.divID).hide()
	// $('#'+this.divID).remove()
}
function submitResponse(buttonIndex,side) {
	var questionObj = questions[buttonIndex]
	var action = questionObj[side+"Action"]
	console.log(action)
	action()
}