var tracks = {
	'rails':{
		score: 0,
		displayName: "Ruby/Rails",
		description: "A nice succinct description for Ruby/Rails",
		color: {hex:"#ff4444",name:"danger"}
	},
	'react':{
		score: 0,
		displayName: "CSS/React",
		description: "A nice succinct description for CSS/React",
		color: {hex:"#ffbb33",name:"warning"}
	},
	'net':{
		score: 0,
		displayName: "C#/.NET",
		description: "A nice succinct description for C#/.NET",
		color: {hex:"#00C851",name:"success"}
	}
}
var questions = [
	{
		query: "Would you rather be an interior decorator or an architect?",
		leftResponse: {
			text: "Interior Decorator",
			weights: [1,2,0] // [rails,react,net]
		},
		rightResponse: {
			text: "Architect",
			weights: [1,0,2]
		}
	},
	{
		query: "Who's cooler: Bill Gates or Willem Dafoe?",
		leftResponse: {
			text: "Bill Gates",
			weights: [1,0,2]
		},
		rightResponse: {
			text: "Willem Dafoe",
			weights: [1,2,0]
		}
	},
	{
		query: "Do you straighten the pictures in hotel rooms?",
		leftResponse: {
			text: "Of course",
			weights: [1,2,0]
		},
		rightResponse: {
			text: "No way",
			weights: [1,0,2]
		}
	},
	{
		query: "Complete this sentence: \"It really grinds my gears when things...\"",
		leftResponse: {
			text: "Don't look right",
			weights: [1,3,0]
		},
		rightResponse: {
			text: "Don't work right",
			weights: [2,0,3]
		},
	},
	{
		query: "John Lennon or Paul McCartney?",
		leftResponse: {
			text: "John",
			weights: [1,0,2]
		},
		rightResponse: {
			text: "Paul",
			weights: [2,1,0]
		}
	}
]
