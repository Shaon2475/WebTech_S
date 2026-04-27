<?php
session_start();

$username = $_POST['username'];
$password = $_POST['password'];


if ($username == "shaon" && $password == "2475") {

 $_SESSION['user'] = $username;
 $_SESSION['start_time'] = time(); 

 header("Location: dashboard.php");
 exit();

} else {
 echo "Invalid login";
}
?>