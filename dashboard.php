<?php
include "db.php";

if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}


$last_login = "First login";

if (isset($_COOKIE["last_login"])) {
    $last_login = $_COOKIE["last_login"];
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>

<h2>Dashboard</h2>

<h3>Welcome, <?php echo htmlspecialchars($_SESSION["user_name"]); ?>!</h3>

<p>Your email: <?php echo htmlspecialchars($_SESSION["user_email"]); ?></p>

<p>Last login time: <?php echo htmlspecialchars($last_login); ?></p>

<a href="logout.php">Logout</a>

</body>
</html>