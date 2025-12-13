<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
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

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $userEmail = isset($_GET['userEmail']) ? trim($_GET['userEmail']) : '';
    
    if (empty($userEmail)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email is required"]);
        $conn->close();
        exit();
    }
    
    // Get user info
    $userStmt = $conn->prepare("SELECT id, username, email, created_at FROM users WHERE email = ? LIMIT 1");
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
    
    // Get note count
    $noteCountStmt = $conn->prepare("SELECT COUNT(*) as note_count FROM notes WHERE user_id = ?");
    $noteCountStmt->bind_param("i", $userRow['id']);
    $noteCountStmt->execute();
    $noteCountResult = $noteCountStmt->get_result();
    $noteCountRow = $noteCountResult->fetch_assoc();
    $userRow['note_count'] = $noteCountRow['note_count'];
    $noteCountStmt->close();
    
    // Get category count
    $categoryCountStmt = $conn->prepare("SELECT COUNT(*) as category_count FROM categories WHERE user_id = ?");
    $categoryCountStmt->bind_param("i", $userRow['id']);
    $categoryCountStmt->execute();
    $categoryCountResult = $categoryCountStmt->get_result();
    $categoryCountRow = $categoryCountResult->fetch_assoc();
    $userRow['category_count'] = $categoryCountRow['category_count'];
    $categoryCountStmt->close();
    
    echo json_encode(["success" => true, "user" => $userRow]);
    $userStmt->close();
} else if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $password = isset($data['password']) ? $data['password'] : '';
    
    if (empty($userEmail) || empty($password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email and password are required"]);
        $conn->close();
        exit();
    }
    
    // Verify user and password
    $userStmt = $conn->prepare("SELECT id, password FROM users WHERE email = ? LIMIT 1");
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
    
    if (!password_verify($password, $userRow['password'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Incorrect password"]);
        $userStmt->close();
        $conn->close();
        exit();
    }
    
    $userId = $userRow['id'];
    $userStmt->close();
    
    // Delete user (cascade will delete notes, categories, settings)
    $deleteStmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    if (!$deleteStmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    $deleteStmt->bind_param("i", $userId);
    
    if ($deleteStmt->execute()) {
        echo json_encode(["success" => true, "message" => "Account deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Delete failed: " . $deleteStmt->error]);
    }
    $deleteStmt->close();
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
}

$conn->close();
?>

