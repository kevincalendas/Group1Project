<?php
$conn = mysqli_connect("localhost", "root", "", "notecode");

if (!$conn) {
    die("Failed to connect: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($email) || empty($password)) {
        die("All fields are required!");
    }
    $sql = "SELECT id FROM users WHERE username";
    $result = $conn -> query($sql);
    if ($result === false) {
        die("Prepare failed: " . $conn->error);
    }

    if ($result->num_rows < 0) {
        die("Username or Email doesnt exists!");
    }
    while($row = $result->fetch_assoc()) {
        echo $row;
    }

    $row = $result -> fetch_assoc();
    echo ($row);

    $result->close();

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
}

$conn->close();
?>
