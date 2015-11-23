//Mikhail Savvateev
//CSE 154 Section CB
//TA: Sam Tisdale
//Javascript for behaivior of 15 puzzle page. Runs game. 

"use strict";
 
var gameStart = false;

 //modular setup
(function() {
	//All initialized to be the lower-most, right-hand block
	var emptySquare = 16; //"id" number for empty space
	var emptyTop = 3; //top "location" for empty space
	var emptyLeft = 3; //left "location" for empty space
	var puzzleSize = 4; //length and width of puzzle
	var peiceSize = 100; //length and width of each peice


	//initializes script to run when page loads.
	window.onload = function() {
		pictureSetUp(); //sets up board with image
		var button = document.getElementById("shufflebutton");
		button.onclick = shuffleMove; //calls shuffle funct when shuffle
		// button clicked
		//check if any of the peices are clicked or hovered over. 
		var puzzlePeices = document.querySelectorAll(".peice");
		for (var i = 0; i < puzzlePeices.length; i++) {
  			puzzlePeices[i].onmouseover = hover;
  			puzzlePeices[i].onmouseout = noHover;
  			puzzlePeices[i].onclick = clickPiece;
		}
	};

	//Initiallizes game by creating board and setting up peices.
	// Creates divs for every tile, stylizes and positions it. 
	function pictureSetUp (){
		var xAxisPos = 0; //left position of subsequent tile
		var yAxisPos = 0; //top position of said tile
		for(var i = 0; i < ((puzzleSize * puzzleSize) - 1); i++){ 
		//makes (puzzlesize^2 - 1) tiles.
			var picturePiece = document.createElement("div");
			picturePiece.innerHTML = (i + 1) + ""; //text on tile
			picturePiece.style.backgroundPosition = xAxisPos + "px " + yAxisPos + "px"; 
			//positons background
			picturePiece.id = (i + 1) + ""; 
			picturePiece.classList.add((i + 1) + ""); 
			picturePiece.classList.add("peice");
			picturePiece.style.top = (Math.floor(i / puzzleSize) * peiceSize) + "px"; 
			//solves for top position of current tile
			picturePiece.style.left = ((i % puzzleSize) * peiceSize) + "px"; 
			//solves for left position of current tile
			document.getElementById("puzzlearea").appendChild(picturePiece);
			if((i + 1) % puzzleSize == 0){ //if this is edge tile
				document.getElementById("puzzlearea").appendChild(
					document.createElement("br")); //creates new line
				//updates positions
				yAxisPos = yAxisPos - peiceSize; 
				xAxisPos = 0;
			} else{
				xAxisPos = xAxisPos - peiceSize;
			}
		}
	}

	//if player hovers over movable tile with mouse, changes style
	function hover () {
		//var currentTop = parseInt(window.getComputedStyle(this).top);
		//var currentLeft = parseInt(window.getComputedStyle(this).left);
		//if(isMovable(currentTop, currentLeft)){ 
		if(isMovable(this.id)){ 
			this.classList.add("hover");
		}
	}

	//removes appropriate classes when user no longer is hovering over tile
	function noHover () {
		this.classList.remove("hover");
	}

	//when user clicks on tile, and it can be moved, it is moved
	function clickPiece (){
		//var currentTop = parseInt(window.getComputedStyle(this).top);
		//var currentLeft = parseInt(window.getComputedStyle(this).left);
		//checks if tile movable
		if(isMovable(this.id)){
			move(this.id);
		}
		testDone();
	}

	//shuffles board to start a game
	function shuffleMove(){
		gameStart = true;
		for(var k = 0; k <= 1000; k++){ //runs 1000 times to ensure shuffling
			var neighbors = [];
			//finds and (if legitimate) adds ids of empty square's neighbors to array. 
			//first does positive cases (1 to the right, 1 down), then negative.
			for(var i = 0; i < 2; i++){
				var newId = emptySquare + Math.pow(puzzleSize, i);
				if(newId <= (puzzleSize * puzzleSize)){
					var square = document.getElementById(newId + "");
					if(square){
					var currentTop = parseInt(window.getComputedStyle(square).top);
					var currentLeft = parseInt(window.getComputedStyle(square).left);
					if(isMovable(newId + "")){
						neighbors.push(newId);
					}
					}
				}
			}
			for(var j = 0; j < 2; j++){
				if(newId >= 1){
					var newId = emptySquare - Math.pow(puzzleSize, j);
					var square = document.getElementById(newId + "");
					if(square){
					var currentTop = parseInt(window.getComputedStyle(square).top);
					var currentLeft = parseInt(window.getComputedStyle(square).left);
					
					if(isMovable(newId + "")){
						neighbors.push(newId);
					}
					}
				}
			}
			//randomly selects one neighbor from list, and moves it. 
			var selection = Math.floor((Math.random() * neighbors.length));
			move(neighbors[selection]);
		}
	}

	// checks to see if a tile can move into empty spot by 
	//determining if it is adjacent to it
	function isMovable(currentId){
			var current = parseInt(currentId);
			var empty = parseInt(emptySquare);
			if(empty % puzzleSize == 0){
				if(current == empty + 1){
					return false;
				}
			} if (empty % puzzleSize == 1){
				if(current == empty - 1){
					return false;
				}
			} if ((current == (empty + 1)) ||(current == (empty - 1)) || (current == (empty + puzzleSize)) || (current == (empty - puzzleSize))){
				return true;
			} else {
				return false;
			}
	}

	//moves tile with passed id into empty space. updates that tile's
	// and the empty space's information accordingly 
	function move(id){
		var square = document.getElementById(id + "");
		var currentTop = parseInt(window.getComputedStyle(square).top);
		var currentLeft = parseInt(window.getComputedStyle(square).left);
		square.style.left = (emptyLeft * peiceSize) + "px";
		square.style.top = (emptyTop * peiceSize) + "px";
		emptyLeft = (currentLeft / peiceSize);
		emptyTop = (currentTop / peiceSize);
		square.id = emptySquare + "";
		emptySquare = id;
		//sets tile to no longer have hover appearance after moving,
		//issue with some browsers. 
		square.onmouseout();
	}

	function testDone(){
		if(gameStart){
			var win = true;
			for(var i = 0; i < puzzleSize; i++){
				for(var j = 0; j < puzzleSize; j++){
					var classTile = ((i * puzzleSize) + j + 1);
					if(classTile != emptySquare){
						//alert(idTile);
						//var tile = document.getElementById(idTile + "");
						var tile = document.getElementsByClassName(classTile)[0];
						var topTile = parseInt(window.getComputedStyle(tile).top);
						var leftTile = parseInt(window.getComputedStyle(tile).left);
						if(i == puzzleSize - 1 && j == puzzleSize - 1){
							break;
						} else {
							if(topTile !== i*peiceSize || leftTile !== j*peiceSize){
								win = false;
								break;
							}
						}
					}
				}
			}
				if(win == true){
					alert("You win! Congratulations!");
					gameStart = false;
				}	
		}
	}











/*		for(var i = 1; i < ((puzzleSize * puzzleSize) - 1); i++){
			var tile = document.getElementById(i + "");
			var topTile = parseInt(window.getComputedStyle(tile).top);
			var leftTile = parseInt(window.getComputedStyle(tile).left);
			alert(Math.floor(i/puzzleSize)*peiceSize + " " + (((i-1)%puzzleSize)*peiceSize) + " " + gameStart);
			if(!gameStart || topTile != (Math.floor(i/puzzleSize)*peiceSize) || leftTile != (((i-1)%puzzleSize)*peiceSize) && gameStart){
				alert(";wat:");
				win = false;
				break;
			}
		}
		if(win && gameStart){
			alert("You win!");
		}


		//four forlooops, one test function second two loops in if; ie if not false,
	}*/
})();
