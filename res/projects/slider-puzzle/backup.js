//Mikhail Savvateev
//CSE 154 Section CB
//TA: Sam Tisdale
//Javascript for behaivior of ASCIImation page. Processes use choices and runs animation

"use strict";

//modular setup
(function() {

	var emptySquare = 16;
	var emptyTop = 300;
	var emptyLeft = 300;
	var gamestart = false;


	//initializes script to run when page loads.
	window.onload = function() {
		pictureSetUp();
		var button = document.getElementById("shufflebutton");
		button.onclick = shuffleMove;
		var puzzlePeices = document.querySelectorAll(".peice");
		for (var i = 0; i < puzzlePeices.length; i++) {
  			puzzlePeices[i].onmouseover = hover;
  			puzzlePeices[i].onmouseout = noHover;
  			puzzlePeices[i].onclick = clickPiece;
  			if(win() && gamestart){
				alert("You win! :)");
			}
		}
	};



	function pictureSetUp (){
		var xAxisPos = 0;
		var yAxisPos = 0;
		for(var i = 0; i < 15; i++){
			var picturePiece = document.createElement("div");
			picturePiece.innerHTML = (i + 1) + "";
			picturePiece.style.backgroundPosition = xAxisPos + "px " + yAxisPos + "px";
			picturePiece.id = (i + 1) + "";
			picturePiece.classList.add("peice");
			picturePiece.style.top = (Math.floor(i / 4) * 100) + "px";
			picturePiece.style.left = ((i % 4) * 100) + "px";
			document.getElementById("puzzlearea").appendChild(picturePiece);
			if((i + 1) % 4 == 0){
				document.getElementById("puzzlearea").appendChild(
					document.createElement("br"));
				yAxisPos = yAxisPos - 100;
				xAxisPos = 0;
			} else{
				xAxisPos = xAxisPos - 100;
			}
		}
	}

	function hover () {
		this.classList.add("hover");
		var currentTop = parseInt(window.getComputedStyle(this).top);
		var currentLeft = parseInt(window.getComputedStyle(this).left);
		if(isMovable(currentTop, currentLeft)){
			this.classList.add("movable");
		}
	}

	function noHover () {
		this.classList.remove("hover");
		this.classList.remove("movable");
	}

	function clickPiece (){
		gamestart = true;
		var currentTop = parseInt(window.getComputedStyle(this).top);
		var currentLeft = parseInt(window.getComputedStyle(this).left);
		if(isMovable(currentTop, currentLeft)){
			move(this.id);
		}
	}

	function shuffleMove(){
		gamestart = true;
		for(var k = 0; k <= 1000; k++){
			var neighbors = [];
			for(var i = 0; i < 2; i++){
				var newId = emptySquare + Math.pow(4, i);
				if(newId <= 16){
					neighbors.push(newId);
				}
			}
			for(var j = 0; j < 2; j++){
				var newId = emptySquare - Math.pow(4, j);
				if(newId >= 1){
					neighbors.push(newId);
				}
			}
			var selection = Math.floor((Math.random() * neighbors.length));
			move(neighbors[selection]);
		}
	}

	function isMovable(currentTop, currentLeft){
		if((currentTop == emptyTop || currentLeft == emptyLeft) && 
			(currentTop == emptyTop - 100 || currentTop == emptyTop + 100 || 
			currentLeft == emptyLeft - 100 || currentLeft == emptyLeft + 100)){
			return true;
		} else {
			return false;
		}
	}

	function move(id){
		var square = document.getElementById(id + "");
		var currentTop = parseInt(window.getComputedStyle(square).top);
		var currentLeft = parseInt(window.getComputedStyle(square).left);
		square.style.left = emptyLeft + "px";
		square.style.top = emptyTop + "px";
		emptyLeft = currentLeft;
		emptyTop = currentTop;
		square.id = emptySquare + "";
		emptySquare = id;
	}

	function win(){
		var won = true;
		for(var i = 1; i <= 15; i++){
			if(document.getElementById(i + "").innerHTML != (i + "")){
				var won = false;
			}
		}
		return won;
	}


})();
