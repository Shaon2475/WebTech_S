<?php
session_start();

$timeout = 180; 


if (!isset($_SESSION['user'])) {
    header("Location: index.php"); 
    exit();
}


if (time() - $_SESSION['start_time'] > $timeout) {
    session_unset();
    session_destroy();

    header("Location: index.php"); 
    exit();
}

$username = $_SESSION['user'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<h2>Dashboard Page</h2>

<h3>Welcome, <?php echo $username; ?>!</h3>

<p>You are successfully logged in.</p>
<p>This page uses session data to maintain your login state across multiple pages.</p>

<p>You will be logged out automatically after 3 minute.</p>

<br>

<a href="logout.php">Logout</a>

</body>
</html>