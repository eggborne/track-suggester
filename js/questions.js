var questions = [
	{
		query: "Would you rather be an interior decorator or an architect?",
		leftResponse: {
			text: "Interior Decorator",
			weights: {
				rails:1,
				react:2,
				net:0
			}
		},
		rightResponse: {
			text: "Architect",
			weights: {
				rails:1,
				react:0,
				net:3
			}
		},
		leftAction: function(){
			updateTrackScores(questions[0].leftResponse.weights)
			cards[0].swoop("out")
			var nextCard = 1
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(questions[0].rightResponse.weights)
			cards[0].swoop("out")
			var nextCard = 1
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "Who's cooler: Bill Gates or Marc Ecko?",
		leftResponse: {
			text: "Bill Gates",
			weights: {
				rails:1,
				react:0,
				net:2
			}
		},
		rightResponse: {
			text: "Marc Ecko",
			weights: {
				rails:1,
				react:2,
				net:0
			}
		},
		leftAction: function(){
			updateTrackScores(questions[1].leftResponse.weights)
			cards[1].swoop("out")
			nextCard = 2
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(questions[1].rightResponse.weights)
			cards[1].swoop("out")
			nextCard = 2
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "Do you straighten the pictures in hotel rooms?",
		leftResponse: {
			text: "Of course",
			weights: {
				rails:1,
				react:3,
				net:0
			}
		},
		rightResponse: {
			text: "No way",
			weights: {
				rails:1,
				react:0,
				net:2
			}
		},
		leftAction: function(){
			updateTrackScores(questions[2].leftResponse.weights)
			cards[2].swoop("out")
			nextCard = 3
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(questions[2].rightResponse.weights)
			cards[2].swoop("out")
			nextCard = 3
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "Complete this sentence: \"It really grinds my gears when things...\"",
		leftResponse: {
			text: "Don't look right",
			weights: {
				rails:1,
				react:2,
				net:0
			}
		},
		rightResponse: {
			text: "Don't work right",
			weights: {
				rails:1,
				react:0,
				net:4
			}
		},
		leftAction: function(){
			updateTrackScores(questions[3].leftResponse.weights)
			cards[3].swoop("out")
			nextCard = 4
			new Card(nextCard)
		},
		rightAction: function(){
			updateTrackScores(questions[3].rightResponse.weights)
			cards[3].swoop("out")
			nextCard = 4
			new Card(nextCard)
		},
		cardObject: undefined
	},
	{
		query: "John Lennon or Paul McCartney?",
		leftResponse: {
			text: "John",
			weights: {
				rails:1,
				react:0,
				net:1
			}
		},
		rightResponse: {
			text: "Paul",
			weights: {
				rails:2,
				react:1,
				net:0
			}
		},
		leftAction: function(){
			updateTrackScores(questions[4].leftResponse.weights)
			cards[4].ease("out")
			$('#overlay').hide()
			produceResult()
		},
		rightAction: function(){
			updateTrackScores(questions[4].rightResponse.weights)
			cards[4].ease("out")
			$('#overlay').hide()
			produceResult()
		},
		cardObject: undefined
	}
]
