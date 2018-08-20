/**
 * Creates instances of ColumnGenerator().
 */
function ColumnGenerator() {
	/**
	 * Adds an empty Bootstrap grid to the DOM.
	 * 
	 * @param {array} layoutArray An array containing row and column data.
	 * @param {string} [destination=#stage] A selector for the element to append the grid to.
	 * @param {boolean} [bordered=false] Whether the grid should have a 1px solid black border.
	 */
	this.insertLayout = function(layoutArray,destination,bordered) {
		var parent = (destination || "#stage");
		var border = ''
		if (bordered) { border = ";border: 1px solid black"; }
		var rows = layoutArray.length;
		for (var r=0;r<rows;r++) {
			var columns = layoutArray[r][0].length;
			// set the row's height if specified
			var rowHeight = (layoutArray[r][1] || 'auto');
			// make the row div
			$(parent).append(`<div id="row-`+r+`" class="row generated"></div>`);
			// grab the row div you just made
			var newRow = $('#row-'+r);
			// put the columns in
			for (var c=0;c<columns;c++) {
				var columnWidth = layoutArray[r][0][c];
				newRow.append(`<div id="column-`+r+`-`+c+`" class="col-xs-`+columnWidth+` generated" style="height:`+rowHeight+border+`"></div>`);
			}
		}
	}
}