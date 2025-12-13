<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = mysqli_connect("localhost", "nick", "nick2025", "notecode");

if (!$conn) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $noteId = isset($data['noteId']) ? intval($data['noteId']) : null;

    if (empty($userEmail) || !$noteId) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email and note ID are required"]);
        $conn->close();
        exit();
    }

    // Get user ID from email
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

    // Delete the note (only if it belongs to the user)
    $deleteStmt = $conn->prepare("DELETE FROM notes WHERE id = ? AND user_id = ?");
    $deleteStmt->bind_param("ii", $noteId, $userId);
    
    if ($deleteStmt->execute()) {
        if ($deleteStmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Note deleted successfully"]);
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "error" => "Note not found or access denied"]);
        }
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



