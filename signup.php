<?php
require_once __DIR__ . '/firebase.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirmpassword = isset($_POST['confirmpassword']) ? $_POST['confirmpassword'] : '';
    // optional category (e.g., user preference or default folder)
    $category = isset($_POST['category']) ? trim($_POST['category']) : 'Uncategorized';

    if (empty($fullname) || empty($username) || empty($email) || empty($password) || empty($confirmpassword)) {
        die("All fields are required!");
    }

    // basic formatting/validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    if (!preg_match('/^[A-Za-z0-9_.-]{3,30}$/', $username)) {
        die("Username must be 3-30 characters and contain only letters, numbers, dot, underscore or hyphen.");
    }

    if ($password !== $confirmpassword) {
        die("Passwords do not match!");
    }

    // Fetch existing users and check duplicates (small-scale projects)
    $users = firebase_get('users');
    $username_lc = strtolower($username);
    $email_lc = strtolower($email);
    if ($users && is_array($users)) {
        foreach ($users as $u) {
            if (isset($u['username']) && strtolower($u['username']) === $username_lc) {
                die("Username or Email already exists!");
            }
            if (isset($u['email']) && strtolower($u['email']) === $email_lc) {
                die("Username or Email already exists!");
            }
        }
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // sanitize a few fields before saving
    $fullname = htmlspecialchars($fullname, ENT_QUOTES, 'UTF-8');
    $category = substr($category, 0, 64);

    $userData = [
        'fullname' => $fullname,
        'username' => $username,
        'email' => $email,
        'password' => $hashedPassword,
        'category' => $category,
        // small metadata fields
        'createdAt' => time(),
        'updatedAt' => time()
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
