var tracks = {
	'rails': {
		score: 0,
		displayName: "Ruby/Rails",
		description: "A nice succinct description for Ruby/Rails",
		color: {hex:"#ff4444",name:"danger"}
	},
	'react': {
		score: 0,
		displayName: "CSS/React",
		description: "A nice succinct description for CSS/React",
		color: {hex:"#ffbb33",name:"warning"}
	},
	'net': {
		score: 0,
		displayName: "C#/.NET",
		description: "A nice succinct description for C#/.NET",
		color: {hex:"#00C851",name:"success"}
	}
};
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
			weights: [1,0,3]
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
			weights: [1,2,0]
		}
	}
];
// plan graph height to avoid overflow-y on results page
var gGraphHeight = window.innerHeight*0.4; // max amount view height can spare
if (gGraphHeight > 250) {
	gGraphHeight = 250;
} else if (gGraphHeight < 100) {
	gGraphHeight = 100;
}
/**
 * An object whose key-value pairs are the name of a grid layout and an array, 
 * which is passed to ColumnGenerator's .insertLayout() method to provide it with a 'blueprint' to use when creating a grid.
 * 
 * Each 'row' of the array corresponds to a grid row and contains:
 * 
 * 1. An array containing one or more integers, which each represent a column and its relative width in the row.
 *    ColumnGenerator.insertLayout() iterates through it and concatenates its values into the HTML string it produces.
 * 
 * 2. (Optional - default 'auto') A string containing a CSS-compatible 'height' value for the row.
 */
var gGridLayouts = {
	'graph':
	[
		[[4,4,4],gGraphHeight+'px'],
		[[4,4,4]]
	]
};
