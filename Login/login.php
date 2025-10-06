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

    $sql = "SELECT id, username, password FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ss", $email, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        die("Username or Email doesn't exist!");
    }

    $row = $result->fetch_assoc();

    if (password_verify($password, $row['password'])) {
        echo "Login successful! Welcome, " . htmlspecialchars($row['username']) . "!";
        header("Location: ../MainOptions/MainHomeSection.html");
    } else {
        die("Incorrect password!");
    }

    $stmt->close();
}

$conn->close();
?>
