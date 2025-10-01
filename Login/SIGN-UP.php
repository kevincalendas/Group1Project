<?php
$conn = mysqli_connect("localhost", "root", "", "note code");

if (!$conn) {
    die("Failed to connect: " . mysqli_connect_error());
}

$fullname = $_POST['fullname'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirmpassword = $_POST['confirmpassword'];

if ($password !== $confirmpassword) {
    die("Passwords do not match!");
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO sign_up (fullname, username, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $fullname, $username, $email, $hashedPassword);

if ($stmt->execute()) {
    echo "Account created successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>