<?php
session_start();

$host = "localhost";
$user = "root";
$password = "";
$dbName = "hospital_management_db";

$conn = mysqli_connect($host, $user, $password, $dbName);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>