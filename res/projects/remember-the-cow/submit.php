<?php
	/*Mikhail Savvateev
	CSE 154 Section CB
	TA: Sam Tisdale
	PHP file for "Remember the Cow" website do item submit
	This page takes info and adds/deletes from todo list*/
	session_start();
	if ($_POST["action"] == "delete"){ //if item deleted
		$index = $_POST["index"];
		$list = file("todo_".$_SESSION["name"].".txt"); //writes full list to array
		unset($list[$index]); //deletes tem from array
		file_put_contents("todo_".$_SESSION["name"].".txt", $list); //rewrites file
	} 
	elseif ($_POST["action"] == "add"){ //adding item
		$newItem = $_POST["item"]."\n";
		file_put_contents("todo_".$_SESSION["name"].".txt", $newItem, FILE_APPEND); //adds new item to end of list
	}
	header("Location: todolist.php"); //returns to todolist page
?>