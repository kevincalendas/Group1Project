<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = mysqli_connect("localhost", "root", "", "notecode");

if (!$conn) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $noteId = isset($data['noteId']) ? intval($data['noteId']) : null;
    $title = isset($data['title']) ? trim($data['title']) : '';
    $content = isset($data['content']) ? $data['content'] : '';

    if (empty($userEmail) || empty($title)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email and title are required"]);
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

    // Check if note exists (for update) or create new
    if ($noteId && $noteId > 0) {
        // Update existing note
        $checkStmt = $conn->prepare("SELECT id FROM notes WHERE id = ? AND user_id = ? LIMIT 1");
        $checkStmt->bind_param("ii", $noteId, $userId);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();
        
        if ($checkResult->num_rows > 0) {
            // Update existing note
            $updateStmt = $conn->prepare("UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
            $updateStmt->bind_param("ssii", $title, $content, $noteId, $userId);
            
            if ($updateStmt->execute()) {
                echo json_encode(["success" => true, "noteId" => $noteId, "message" => "Note updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "error" => "Update failed: " . $updateStmt->error]);
            }
            $updateStmt->close();
        } else {
            // Note ID doesn't exist or doesn't belong to user, create new
            $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)");
            $insertStmt->bind_param("iss", $userId, $title, $content);
            
            if ($insertStmt->execute()) {
                $newNoteId = $conn->insert_id;
                echo json_encode(["success" => true, "noteId" => $newNoteId, "message" => "Note created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "error" => "Insert failed: " . $insertStmt->error]);
            }
            $insertStmt->close();
        }
        $checkStmt->close();
    } else {
        // Create new note
        $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)");
        $insertStmt->bind_param("iss", $userId, $title, $content);
        
        if ($insertStmt->execute()) {
            $newNoteId = $conn->insert_id;
            echo json_encode(["success" => true, "noteId" => $newNoteId, "message" => "Note created successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Insert failed: " . $insertStmt->error]);
        }
        $insertStmt->close();
    }
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Get notes for a user
    $userEmail = isset($_GET['userEmail']) ? trim($_GET['userEmail']) : '';
    
    if (empty($userEmail)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email is required"]);
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

    // Get all notes for this user
    $notesStmt = $conn->prepare("SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC");
    $notesStmt->bind_param("i", $userId);
    $notesStmt->execute();
    $notesResult = $notesStmt->get_result();

    $notes = [];
    while ($row = $notesResult->fetch_assoc()) {
        $notes[] = $row;
    }

    echo json_encode(["success" => true, "notes" => $notes]);
    $notesStmt->close();
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
}

$conn->close();
?>

