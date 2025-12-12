<?php
$conn = mysqli_connect("localhost", "meow", "Kingbunner123", "notecode");

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
        // Store email and username in session for the next page
        session_start();
        $_SESSION['userEmail'] = $email;
        $_SESSION['username'] = $row['username'];
        
        // Redirect with email as query parameter so JavaScript can set localStorage
        $encodedEmail = urlencode($email);
        $encodedUsername = urlencode($row['username']);
        header("Location: ../MainOptions/MainHomeSection.html?email=" . $encodedEmail . "&username=" . $encodedUsername);
        exit();
    } else {
        die("Incorrect password!");
    }

    $stmt->close();
}
$conn->close();
?>
