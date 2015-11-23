<?php
	/*Mikhail Savvateev
	CSE 154 Section CB
	TA: Sam Tisdale
	PHP file for "Remember the Cow" website start page
	This page takes login info and redirects to login pg (to login or create account)
	
	Added additional feature which offers more indepth error messages to user if they:
	-do not enter pass/name
	-enter a wrong pass for existing account
	-try to enter todolist without logging in
	-try to create account with name/password not matching requirements. */
	include("common.php");
	top();  //prints header
	session_start();
	if(isset($_SESSION["name"]) && isset($_SESSION["password"])){  //if session exists, logs user in
		header("Location: todolist.php"); 
		die;
	}
	
	function errors (){ //prints various messages to inform user of errors
		if (isset($_GET["entered"])) { ?> <!-- Error=name or pass not entered -->
            <div><em>ERROR: Please enter Username or Password</em></div><br />
		<?php }elseif(isset($_GET["wrong"])){?> <!-- Error=wrong password -->
            <div><em>ERROR: Account Already Exists / Incorrect Password :(</em></div><br />
		<?php }elseif(isset($_GET["bad"])){?> <!-- Error=name/pass doesnt match reqs -->
        	<div><em>ERROR: Bad Username or Password :(<br />
        	Usernames must be 3-8 characters long, begin with a letter, and consist entirely of lowercase letters and numbers<br />
            Passwords must be 6-12 characters long, begin with a number, and end with any character that is not alphanumeric.</em></div><br />
        <?php }elseif(isset($_GET["nosession"])) { ?> <!-- Error=tries to access todolist without logging in -->
            <div><em>ERROR: Please Log In</em></div><br />
		<?php }	
	}
?> 

		<div id="main">
			<p>
				The best way to manage your tasks. <br />
				Never forget the cow (or anything else) again!
			</p>

			<p>
				Log in now to manage your to-do list. <br />
				If you do not have an account, one will be created for you.
			</p>
            
            <?php errors(); //prints error message if applicable?>
	
			<form id="loginform" action="login.php" method="post"> 
				<div><input name="name" type="text" size="8" autofocus /> <strong>User Name</strong></div>
				<div><input name="password" type="password" size="8" /> <strong>Password</strong></div>
				<div><input type="submit" value="Log in" /></div>
			</form>
			<?php 
				if(isset($_COOKIE["lastLogin"])){  //if last login exists prints last login time?> 
					<p>
						<em>(last login from this computer was <?= $_COOKIE["lastLogin"] ?>)</em>
					</p>
            <?php } ?>
		</div>
        
<?= bottom(); //prints footer?>

