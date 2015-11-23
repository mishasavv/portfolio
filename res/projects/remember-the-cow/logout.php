<?php
	/*Mikhail Savvateev
	CSE 154 Section CB
	TA: Sam Tisdale
	PHP file for "Remember the Cow" website logout
	This page logs out user*/
	session_start();
	session_destroy();
	header("Location: start.php"); //returbs user to start page
?>