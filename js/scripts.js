$(document).ready(function(){
	$('#start-button').click(function(){
		console.log("start clicked!")
		$('#question-card-1').show();
		$('#overlay').show();
	})
	$('.yes-button').click(function(){
		console.log(this + " clicked!")
	})
	$('.no-button').click(function(){
		console.log(this + " clicked!")
	})
})