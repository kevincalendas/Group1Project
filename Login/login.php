<?php
<<<<<<< HEAD
require_once __DIR__ . '/../firebase.php';
=======
$conn = mysqli_connect("localhost", "nick", "nick2025", "notecode");

if (!$conn) {
    die("Failed to connect: " . mysqli_connect_error());
}
>>>>>>> 3be5c333bc6f77801ee7e3f8b1b5a2d9a4468afd

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($email) || empty($password)) {
        die("All fields are required!");
    }

    // Fetch users and find by email or username
    $users = firebase_get('users');
    $found = null;
    if ($users && is_array($users)) {
        foreach ($users as $u) {
            if ((isset($u['email']) && $u['email'] === $email) || (isset($u['username']) && $u['username'] === $email)) {
                $found = $u;
                break;
            }
        }
    }

    if (!$found) {
        die("Username or Email doesn't exist!");
    }

<<<<<<< HEAD
    if (isset($found['password']) && password_verify($password, $found['password'])) {
        echo "Login successful! Welcome, " . htmlspecialchars($found['username']) . "!";
        header("Location: ../MainOptions/MainHomeSection.html");
=======
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
>>>>>>> 3be5c333bc6f77801ee7e3f8b1b5a2d9a4468afd
    } else {
        die("Incorrect password!");
    }
}
<<<<<<< HEAD
=======
$conn->close();
>>>>>>> 3be5c333bc6f77801ee7e3f8b1b5a2d9a4468afd
?>
