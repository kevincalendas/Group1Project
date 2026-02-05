<?php
require_once __DIR__ . '/../firebase.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirmpassword = isset($_POST['confirmpassword']) ? $_POST['confirmpassword'] : '';

    if (empty($fullname) || empty($username) || empty($email) || empty($password) || empty($confirmpassword)) {
        die("All fields are required!");
    }

    if ($password !== $confirmpassword) {
        die("Passwords do not match!");
    }

    // Fetch existing users and check duplicates
    $users = firebase_get('users');
    if ($users && is_array($users)) {
        foreach ($users as $u) {
            if (isset($u['username']) && $u['username'] === $username) {
                die("Username or Email already exists!");
            }
            if (isset($u['email']) && $u['email'] === $email) {
                die("Username or Email already exists!");
            }
        }
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $userData = [
        'fullname' => $fullname,
        'username' => $username,
        'email' => $email,
        'password' => $hashedPassword
    ];

    $res = firebase_post('users', $userData);
    if (isset($res['name'])) {
        echo "Account created successfully!";
        echo "<script>window.location = 'index.html'; alert('Account created successfully!');</script>";
    } else {
        echo "Error creating account.";
    }
}
?>
