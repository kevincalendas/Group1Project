<?php
$conn = mysqli_connect("localhost", "root", "", "note code");

if ($conn) {
    echo "Connected";
} else {
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

$stmt = $conn->prepare("INSERT INTO sign_up (fullname, username, email, password, confirmpassword) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $fullname, $username, $email, $password, $confirmpassword);

if ($stmt->execute()) {
    echo "Data inserted successfully!";
} else {
    echo "Data not sent: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>