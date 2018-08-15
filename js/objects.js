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
var questions = [
	{
		query: "Would you rather be an interior decorator or an architect?",
		leftResponse: {
			text: "Interior Decorator",
		},
		rightResponse: {
			text: "Architect",
		}
	},
	{
		query: "Who's cooler: Bill Gates or Willem Dafoe?",
		leftResponse: {
			text: "Bill Gates"
		},
		rightResponse: {
			text: "Willem Dafoe"
		}
	},
	{
		query: "Do you straighten the pictures in hotel rooms?",
		leftResponse: {
			text: "Of course"
		},
		rightResponse: {
			text: "No way"
		}
	},
	{
		query: "Complete this sentence: \"It really grinds my gears when things...\"",
		leftResponse: {
			text: "Don't look right"
		},
		rightResponse: {
			text: "Don't work right"
		},
		position: 3
	},
	{
		query: "John Lennon or Paul McCartney?",
		leftResponse: {
			text: "John",
		},
		rightResponse: {
			text: "Paul",
		}
	}
]
