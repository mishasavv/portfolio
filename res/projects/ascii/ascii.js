//Mikhail Savvateev
//CSE 154 Section CB
//TA: Sam Tisdale
//Javascript for behaivior of ASCIImation page. Processes use choices and runs animation

"use strict";

//modular setup
(function() {
	var timeDelay = 250; //time in miliseconds.
	var timer = null; //reference to timer used
	var frameNumber = 0; //stores current number of frames
	var text = ""; //text in box when animation starts

	//initializes script to run when page loads.
	window.onload = function() {
		var goButton = document.getElementById("start"); //Start button
		var stopButton = document.getElementById("stop"); //Stop Button
		goButton.onclick = go; //Runs funct. to start animation when Start clicked
		stopButton.onclick = stop; //Runs funct. to stop animation when clicked
		var animation = document.getElementById("animation");
		//Prints out animation full text when animation selection changes
		animation.onchange = printText; 
		var size = document.getElementById("size");
		size.onchange = sizeChange; //changes size of text on change of size selection. 
		//Checks if speed selection has changed
		var speeds = document.querySelectorAll(".speed"); 
			for(var i = 0; i < speeds.length; i++) {
				speeds[i].onchange = changeSpeed;	
			}
			//initially sets stop button to disabled.
			document.getElementById("stop").disabled = true;
		};


	//Prints out full text of animation selected
	function printText(){
		var animationName = document.getElementById("animation").value;
		if(animationName == "EXERCISE" || animationName == "JUGGLER" || 
			animationName == "BIKE" || animationName == "DIVE" || animationName == "CUSTOM"){
			document.getElementById("textbox").value = ANIMATIONS[animationName];
		} else{ //blank selected
			document.getElementById("textbox").value = "";		
		}
	}

	//starts animation
	function go(){
		//disables start and anim. buttons, turns on stop.
		document.getElementById("start").disabled = true; 
		document.getElementById("animation").disabled = true;
		document.getElementById("stop").disabled = false;
		animate();
	}

	//Stops animation and returns original text to textarea
	function stop(){
		//enables start and anim. buttons, disables stop.
		document.getElementById("stop").disabled = true;
		document.getElementById("start").disabled = false;
		document.getElementById("animation").disabled = false;
		clearInterval(timer); //stops interval function
		frameNumber = 0; //restes frame count
		document.getElementById("textbox").value = text;
	}

	//changes animation speed
	function changeSpeed(){
		var speeds = document.getElementsByName('speed');
		//finds selected speed
		for (var i = 0; i < speeds.length; i++) {
			if (speeds[i].checked) {
				timeDelay = parseInt(speeds[i].value);
			}
		}
		//checks if animation is currently running, if yes, 
		//restarts interval for new timeDelay
		if(document.getElementById("start").disabled){
			clearInterval(timer);
			timer = setInterval(nextFrame, timeDelay);
		}
	}

	//changes size of text in text area.
	function sizeChange(){
		var size = document.getElementById("size").value;
		document.getElementById("textbox").style.fontSize = size;
	}

	//starts animation, gets text from textarea and starts interval 
	//runs the printframe function every timeDelay interval (ms)
	function animate(){
		text = document.getElementById("textbox").value;
		timer = setInterval(nextFrame, timeDelay); 
	}

	//prints next frame in animation
	function nextFrame(){
		var frames  = text.split("=====\n");  //splits up content of textarea into frames
		//prints next frame based on current frame number. 
		document.getElementById("textbox").value = frames[frameNumber % frames.length];
		frameNumber++;
	}
})();
