<?php
include "db.php";

$message = "";
$saved_email = "";

if (isset($_COOKIE["user_email"])) {
    $saved_email = $_COOKIE["user_email"];
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    $sql = "SELECT * FROM registrations WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);

        if (password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["full_name"];
            $_SESSION["user_email"] = $user["email"];

            setcookie("user_email", $user["email"], time() + (86400 * 30), "/");
            setcookie("last_login", date("Y-m-d H:i:s"), time() + (86400 * 30), "/");

            header("Location: dashboard.php");
            exit();
        } else {
            $message = "Invalid password.";
        }
    } else {
        $message = "No user found with this email.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>

<h2>Login</h2>

<p style="color:red;"><?php echo $message; ?></p>

<form method="POST">
    <label>Email:</label><br>
    <input type="email" name="email" value="<?php echo htmlspecialchars($saved_email); ?>" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Login</button>
</form>

<p>New user? <a href="register.php">Register here</a></p>

</body>
</html>