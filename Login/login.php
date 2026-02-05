<?php
require_once __DIR__ . '/../firebase.php';

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

    if (isset($found['password']) && password_verify($password, $found['password'])) {
        echo "Login successful! Welcome, " . htmlspecialchars($found['username']) . "!";
        header("Location: ../MainOptions/MainHomeSection.html");
    } else {
        die("Incorrect password!");
    }
}
?>
