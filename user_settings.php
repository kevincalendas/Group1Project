<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = mysqli_connect("localhost", "meow", "Kingbunner123", "notecode");

if (!$conn) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}

// Create user_settings table if it doesn't exist
$createTableSQL = "CREATE TABLE IF NOT EXISTS user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    theme VARCHAR(255) DEFAULT 'theme1',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
)";

$conn->query($createTableSQL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $theme = isset($data['theme']) ? trim($data['theme']) : 'theme1';
    
    if (empty($userEmail)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email is required"]);
        $conn->close();
        exit();
    }
    
    // Get user ID
    $userStmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
    if (!$userStmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    $userStmt->bind_param("s", $userEmail);
    $userStmt->execute();
    $userResult = $userStmt->get_result();
    
    if ($userResult->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["success" => false, "error" => "User not found"]);
        $userStmt->close();
        $conn->close();
        exit();
    }
    
    $userRow = $userResult->fetch_assoc();
    $userId = $userRow['id'];
    $userStmt->close();
    
    // Insert or update theme
    $upsertStmt = $conn->prepare("INSERT INTO user_settings (user_id, theme) VALUES (?, ?) ON DUPLICATE KEY UPDATE theme = ?, updated_at = CURRENT_TIMESTAMP");
    if (!$upsertStmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    $upsertStmt->bind_param("iss", $userId, $theme, $theme);
    
    if ($upsertStmt->execute()) {
        echo json_encode(["success" => true, "theme" => $theme, "message" => "Theme saved successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Save failed: " . $upsertStmt->error]);
    }
    $upsertStmt->close();
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $userEmail = isset($_GET['userEmail']) ? trim($_GET['userEmail']) : '';
    
    if (empty($userEmail)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email is required"]);
        $conn->close();
        exit();
    }
    
    // Get user ID
    $userStmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
    if (!$userStmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    $userStmt->bind_param("s", $userEmail);
    $userStmt->execute();
    $userResult = $userStmt->get_result();
    
    if ($userResult->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["success" => false, "error" => "User not found"]);
        $userStmt->close();
        $conn->close();
        exit();
    }
    
    $userRow = $userResult->fetch_assoc();
    $userId = $userRow['id'];
    $userStmt->close();
    
    // Get user settings
    $settingsStmt = $conn->prepare("SELECT theme FROM user_settings WHERE user_id = ? LIMIT 1");
    if (!$settingsStmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    $settingsStmt->bind_param("i", $userId);
    $settingsStmt->execute();
    $settingsResult = $settingsStmt->get_result();
    
    if ($settingsResult->num_rows > 0) {
        $settingsRow = $settingsResult->fetch_assoc();
        echo json_encode(["success" => true, "theme" => $settingsRow['theme']]);
    } else {
        // Return default theme if no settings found
        echo json_encode(["success" => true, "theme" => "theme1"]);
    }
    $settingsStmt->close();
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
}

$conn->close();
?>


