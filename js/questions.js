var questions = [
	{
		query: "Would you rather be an interior decorator or a construction worker?",
		leftResponse: {
			text: "<small>Interior Decorator</small>",
			weights: {
				rails:1,
				react:2,
				net:0
			}
		},
		rightResponse: {
			text: "<small>Construction Worker</small>",
			weights: {
				rails:1,
				react:0,
				net:3
			}
		},
		leftAction: function(){
			updateTotals(questions[0].leftResponse.weights)
			cards[0].destroy()
			currentCard = new Card(1)
		},
		rightAction: function(){
			updateTotals(questions[0].rightResponse.weights)
			cards[0].destroy()
			currentCard = new Card(1)
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
			updateTotals(questions[1].leftResponse.weights)
			cards[1].destroy()
			new Card(2)
		},
		rightAction: function(){
			updateTotals(questions[1].rightResponse.weights)
			cards[1].destroy()
			new Card(2)
		},
		cardObject: undefined
	},
	{
		query: "Do you straighten the pictures in hotel rooms?",
		leftResponse: {
			text: "Of course",
			weights: {
				rails:1,
				react:2,
				net:0
			}
		},
		rightResponse: {
			text: "No way",
			weights: {
				rails:1,
				react:0,
				net:3
			}
		},
		leftAction: function(){
			updateTotals(questions[2].leftResponse.weights)
			cards[2].destroy()
			new Card(3)
		},
		rightAction: function(){
			updateTotals(questions[2].rightResponse.weights)
			cards[2].destroy()
			new Card(3)
		},
		cardObject: undefined
	},
]