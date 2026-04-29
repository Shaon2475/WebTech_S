<?php
include "db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = trim($_POST["full_name"]);
    $email = trim($_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $phone = "";
    $role = "student";
    $track = "foundations";
    $start_date = date("Y-m-d");
    $notes = "";
    $terms_accepted = 1;

    $sql = "INSERT INTO registrations 
    (full_name, email, phone, password, role, track, start_date, notes, terms_accepted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param(
        $stmt,
        "ssssssssi",
        $full_name,
        $email,
        $phone,
        $password,
        $role,
        $track,
        $start_date,
        $notes,
        $terms_accepted
    );

    if (mysqli_stmt_execute($stmt)) {
        header("Location: login.php");
        exit();
    } else {
        $message = "Email already exists or registration failed.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>

<h2>Registration</h2>

<p style="color:red;"><?php echo $message; ?></p>

<form method="POST">
    <label>Name:</label><br>
    <input type="text" name="full_name" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Register</button>
</form>

<p>Already registered? <a href="login.php">Login here</a></p>

</body>
</html>