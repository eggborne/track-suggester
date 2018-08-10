var questions = [
	{
		query : "Do you prefer a flan?",
		leftResponse: "Yes",
		rightResponse: "No",
		leftAction: function(){
			console.log("performing left button action for Q1")
		},
		rightAction: function(){
			console.log("performing right button action for Q1")
		},
	}
]
var cards = []
$(document).ready(function(){
	new Card(0)
	$('#start-button').click(function(){
		console.log("start clicked!")
		$('#'+cards[0].divID).show()
		$('#overlay').show();
	})
	$('.left-button').click(function(){
		var index = this.id[this.id.length-1]
		submitResponse(index,"left")
	})
	$('.right-button').click(function(){
		var index = this.id[this.id.length-1]
		submitResponse(index,"right")
	})
})
function Card(index) {
	var questionObj = questions[index]
	this.divID = "question-card-"+index
	this.html = `<div id="`+this.divID+`" class="panel panel-default question-card"> <div class="panel-heading"> <h2>`+questionObj.query+`</h2> </div> <div class="panel-body"> <img class="question-image-`+index+`" src="img/placeholder0.png" alt="A snazzy relevant image"></img> <div class="btn-group" role="group"> <button id="left-button-`+index+`" type="button" class="btn btn-success btn-wd left-button">`+questionObj.leftResponse+`</button> <button id="right-button-`+index+`" type="button" class="btn btn-danger btn-wd right-button">`+questionObj.rightResponse+`</button> </div> </div> </div>`
	$('#card-area').html(this.html)
	cards.push(this)
}
Card.prototype.showFancy = function() {
	
}
function submitResponse(buttonIndex,side) {
	var questionObj = questions[buttonIndex]
	var action = questionObj[side+"Action"]
	action()
}