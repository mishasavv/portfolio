<?php
	/*Mikhail Savvateev
	CSE 154 Section CB
	TA: Sam Tisdale
	PHP file for "Remember the Cow" common parts
	Stores common header/footer used in each page*/
	function top (){ //function for top of pages ?> 
		<!DOCTYPE html>
			<html>
				<head>
					<title>Remember the Cow</title>
					<link href="https://webster.cs.washington.edu/css/cow-provided.css" type="text/css" rel="stylesheet" />
					<link href="cow.css" type="text/css" rel="stylesheet" />
					<link href="https://webster.cs.washington.edu/images/todolist/favicon.ico" type="image/ico" rel="shortcut icon" />
				</head>
			
				<body>
					<div class="headfoot">
						<h1>
							<img src="https://webster.cs.washington.edu/images/todolist/logo.gif" alt="logo" />
							Remember<br />the Cow
						</h1>
					</div>
<?php	}

	function bottom (){ //funct for footers of pages ?>
            <div class="headfoot">
                <p>
                    "Remember The Cow is nice, but it's a total copy of another site." - PCWorld<br />
                    All pages and content &copy; Copyright CowPie Inc.
                </p>
    
                <div id="w3c">
                    <a href="https://webster.cs.washington.edu/validate-html.php">
                        <img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML" /></a>
                    <a href="https://webster.cs.washington.edu/validate-css.php">
                        <img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
                </div>
            </div>
        </body>
    </html>
<?php	}
?>