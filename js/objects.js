var tracks = {
	'rails':{
		score: 0,
		displayName: "Ruby/Rails",
		description: "A nice succinct description for Ruby/Rails",
		weights: [[1,1],[1,1],[1,1],[1,1],[1,2]],
		color: {hex:"#ff4444",name:"danger"}
	},
	'react':{
		score: 0,
		displayName: "CSS/React",
		description: "A nice succinct description for CSS/React",
		weights: [[2,0],[0,2],[3,0],[3,0],[0,1]],
		color: {hex:"#ffbb33",name:"warning"}
	},
	'net':{
		score: 0,
		displayName: "C#/.NET",
		description: "A nice succinct description for C#/.NET",
		weights: [[0,2],[2,0],[0,2],[0,4],[1,0]],
		color: {hex:"#00C851",name:"success"}
	}
}
//* leftAction and rightAction functions could be created in a loop?
var questions = [
	{
		query: "Would you rather be an interior decorator or an architect?",
		leftResponse: {
			text: "Interior Decorator"
		},
		rightResponse: {
			text: "Architect"
		},
		leftAction: function(){
			updateTrackScores(0,0) // ie track.weights[0][0]
			cards[0].swoop("out")
			var nextCard = 1
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(0,1)
			cards[0].swoop("out")
			var nextCard = 1
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "Who's cooler: Bill Gates or Willem Dafoe?",
		leftResponse: {
			text: "Bill Gates"
		},
		rightResponse: {
			text: "Willem Dafoe"
		},
		leftAction: function(){
			updateTrackScores(1,0)
			cards[1].swoop("out")
			nextCard = 2
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(1,1)
			cards[1].swoop("out")
			nextCard = 2
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "Do you straighten the pictures in hotel rooms?",
		leftResponse: {
			text: "Of course"
		},
		rightResponse: {
			text: "No way"
		},
		leftAction: function(){
			updateTrackScores(2,0)
			cards[2].swoop("out")
			nextCard = 3
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(2,1)
			cards[2].swoop("out")
			nextCard = 3
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "Complete this sentence: \"It really grinds my gears when things...\"",
		leftResponse: {
			text: "Don't look right"
		},
		rightResponse: {
			text: "Don't work right"
		},
		leftAction: function(){
			updateTrackScores(3,0)
			cards[3].swoop("out")
			nextCard = 4
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(3,1)
			cards[3].swoop("out")
			nextCard = 4
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "John Lennon or Paul McCartney?",
		leftResponse: {
			text: "John"
		},
		rightResponse: {
			text: "Paul"
		},
		leftAction: function(){
			updateTrackScores(4,0)
			cards[4].ease("out")
			dismissOverlay()
			prepareResultScreen()
			resultsGraph.reveal()
		},
		rightAction: function(){
			updateTrackScores(4,1)
			cards[4].ease("out")
			dismissOverlay()
			prepareResultScreen()
			resultsGraph.reveal()
		},
		cardObject: undefined
	}
]
