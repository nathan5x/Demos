/*	- Document: JS for Grid operation with Navigational Pad
	- Version:  1.1
	- Author:   Sabarinathan 
*/

$(document).ready(function() { 
	var demoGrid = new DemoGrid();
	demoGrid.initializeDemoGrid($('#gridContainer'));
	
    var navigationPad = new NavPad();
    navigationPad.initializeNavPad($('#navContainer'), demoGrid);
});

/**
* GridPosition class to store the row and col positions of the Grid
*
* @class GridPosition
* @constructor
*/

function GridPosition(row,col) {
	this.row = row;
	this.col = col;
}


/**
* DemoGrid class to perform and handle all the navigational operations.
* This class also holds GridUI, Positions, and Selected Cell Element.
* 
*
* @class DemoGrid
*/

function DemoGrid() {
	this.currentPos = new GridPosition(0,0);
	this.previousPos = new GridPosition(0,0);
	this.selectedCell = '';
	this.initialPos = new GridPosition(1,1);
	this.dgUI = $('<div class="grid">\
        <div class="row">\
        <div class="cell"> </div>\
        <div class="cell"> </div>\
        <div class="cell"> </div>\
    </div>\
    <div class="row">\
        <div class="cell"> </div>\
        <div class="cell"> </div>\
        <div class="cell"> </div>\
    </div>\
    <div class="row">\
	    <div class="cell"> </div>\
        <div class="cell"> </div>\
        <div class="cell"> </div>\
    </div>\
    </div>');
    this.rows;
}

DemoGrid.prototype = {

	/**
	* initializeDemoGrid method to attach the Grid UI into 
	* main stage (HTML) file using the placeholder including 
	* all the events and intial values.
	*
	* @method initializeDemoGrid
	* @param {jQueryObject} placeholder jQuery UI object 
	*/

	initializeDemoGrid: function(placeholder) {
		placeholder.append(this.dgUI);
		this.rows = this.dgUI.find('.row');
		this.currentPos = this.initialPos;
		this.previousPos = this.initialPos;
		this.movePosition();
	},
	
	/**
	* movePosition method to set the selected element based
	* on the currentPos object set by the NavPad Events
	*
	* @method movePosition
	*/
	
	movePosition: function() {
		if(this.selectedCell)
		   this.selectedCell.removeClass('selected');
			
		var row = $(this.rows[this.currentPos.row]);
		var cells = row.find('.cell');
		
		this.selectedCell = $(cells[this.currentPos.col]);
		this.selectedCell.addClass('selected');
	}
		
};

/**
* Navigation Pad class to get User Input through Mouse Click and 
* KeyPress events and trigger Navigational Operations on the 
* SourceGrid object. This class also stores UI and Grid to perform
* navigations.
*
* @class NavPad
*/

function NavPad() {
	this.sourceGrid;
    this.npUI = $(' <div id="navpad" class="navpad"> \
			<div class="row"> \
				<button type="button" class="navbutton up" data-direction-type="UP">  U  </button> \
			</div> \
			<div class="row"> \
				<button class="navbutton left" type="button" data-direction-type="LEFT"> L </button> \
				<button class="navbutton down" type="button" data-direction-type="DOWN"> D </button> \
				<button class="navbutton right" type="button" data-direction-type="RIGHT"> R </button> \
			</div> </div> \ ');     
}

NavPad.prototype = { 

	/**
	* initializeNavPad method to attach the Navigational Pad UI 
	* into main stage (HTML) file using the placeholder including 
	* all the events and intial values. This method also handles 
	* all the navigational operations and triggers the movePosition
	* method on gridToNavigate upon the validation of directionType.
	*
	* 
	* @method initializeNavPad
	* @param {jQueryObject} placeholder jQuery UI object 
	* @param {jQueryObject} gridToNavigate jQuery UI object 
	*/

    initializeNavPad : function(placeholder,gridToNavigate) {
    
        var navPad = this;
        var padUI = navPad.npUI;
        placeholder.append(padUI); 
        
        navPad.sourceGrid = gridToNavigate;
        
        padUI.click( function(event) {
        	console.log(event);
       		validateNavigation($(event.target).data('direction-type'));
        });  
        
        $(window).keydown( function(event) {
        	var directionConfig = { 37: 'LEFT', 38: 'UP', 39: 'RIGHT', 40: 'DOWN'};
        	validateNavigation( directionConfig[event.keyCode] );
        });         
        
        function validateNavigation( directionType ) {
        	
        	if(!directionType)
        		return;
        		
        	var pos = navPad.sourceGrid.currentPos;
        	var prevPos = navPad.sourceGrid.previousPos;
        	var hasValidChange = false;
        	
        	switch( directionType ) { // Can use class name if not data attribute
        		case 'LEFT':
        			if(pos.col <= 2 && pos.col > 0) {
        				hasValidChange = true;
        				pos.col --;
        			}
	        		break;
        		case 'RIGHT':
        			if(pos.col < 2 && pos.col >= 0) {
        				hasValidChange = true;
        				pos.col ++;
        			}
    	    		break;
        		case 'UP':
        			if(pos.row > 0 && pos.row <= 2) {
        				hasValidChange = true;
        				pos.row --;
        			}
        			break;
        		case 'DOWN':
        			if(pos.row >= 0 && pos.row < 2) {
	        			hasValidChange = true;
        				pos.row ++;
        			}
        			break;        		
        	}
        	
        	if(hasValidChange) {
	    		navPad.sourceGrid.movePosition();
			}
        
		}      
    }
    
};

/* ------------------------------------------- */
