<?php
	/*Mikhail Savvateev
	CSE 154 Section CB
	TA: Sam Tisdale
	PHP file for "Remember the Cow" website login/signup page
	This page shows users todo list*/
	include("common.php");
	top(); //prints header
	session_start();
	$name = $_SESSION["name"];
	if(!isset($_SESSION["name"]) || !isset($_SESSION["password"])){ 
		//if user tries to access without active login session, sends back to start
		header("Location: start.php?nosession=true");
		die();
	}
	function writeList ($name){ //writes out list
		$index = 0; //index for keeping track of number 
		$list = file("todo_".$name.".txt", FILE_IGNORE_NEW_LINES);
		foreach($list as $item){ 
		?>
			<li>
				<form action="submit.php" method="post">
					<input type="hidden" name="action" value="delete" />
					<input type="hidden" name="index" value="<?= $index ?>" />
					<input type="submit" value="Delete" />
				</form>
				<?= htmlspecialchars($item) //handles html code enrtered into items?>
			</li>
		<?php 
			$index++;
		} 
	}
?>

		<div id="main">
			<h2><?= $name ?>'s To-Do List</h2>
			<!-- form for adding to list -->
			<ul id="todolist">
				<?= writeList($name); ?>
                <li>
					<form action="submit.php" method="post">
						<input type="hidden" name="action" value="add" />
						<input name="item" type="text" size="25" autofocus />
						<input type="submit" value="Add" />
					</form>
				</li>
			</ul>

			<div>
				<a href="logout.php"><strong>Log Out</strong></a>
				<em>(logged in since <?= $_COOKIE["lastLogin"] ?>)</em>
			</div>

		</div>

<?= bottom(); ?>