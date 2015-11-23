<?php
	/*Mikhail Savvateev
	CSE 154 Section CB
	TA: Sam Tisdale
	PHP file for "Remember the Cow" website login/signup page
	This page takes entered login info and creates account, returns error or logs in user*/
	function bakecookie(){ //sets new cookie for last login
		date_default_timezone_set ("America/Los_Angeles");  //timezone is LA
		$date = date("D y M d, g:i:s a");
		$time = 7 * 24 * 60 * 60;
		setcookie("lastLogin", $date, time()+$time);
	}
	$name = $_POST["name"]; //gets name
	$password = $_POST["password"];
	$accounts = file("users.txt", FILE_IGNORE_NEW_LINES); //reads in file containing account info for all users.
	if ($name == "" || $password == "") { //returns error/goes back to start if feild left blank
			header("Location: start.php?entered=false"); 
			die();
	}
	foreach($accounts as $account){ 
		list($user_name, $user_pass) = explode (":", $account);
		if ($name == $user_name && $password == $user_pass) { //checks if user already exists
			session_start();
			$_SESSION["name"] = $name; //makes new session
			$_SESSION["password"] = $password;
			bakecookie();
			header("Location: todolist.php"); //user exists, logs them in, redirects
			die;
		} elseif ($name == $user_name && $password != $user_pass){
			header("Location: start.php?wrong=true"); //returns error/goes back to start if username exists but password wrong
			die();
		}
	}
	if (preg_match("/^[a-z][a-z0-9]{2,7}$/",$name) && preg_match("/^[0-9].{4,10}\W$/",$password)){
		$entry = $name.":".$password."\n";
		file_put_contents("users.txt", $entry, FILE_APPEND); //records new user
		session_start();
		$_SESSION["name"] = $name; //makes new session
		$_SESSION["password"] = $password;
		bakecookie();
		fopen ("todo_".$name.".txt", "a+"); 
		header("Location: todolist.php");
		die;
	} else {
		header("Location: start.php?bad=true"); //returns error/goes back to start if name or pass doesn't match requirements
		die();
	}
?>
