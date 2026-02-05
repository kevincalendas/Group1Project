<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
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

// Ensure categories table exists
$createCategoriesTable = "CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    UNIQUE KEY unique_user_category (user_id, name)
)";
$conn->query($createCategoriesTable);

// Ensure category_id column exists in notes table
$checkColumn = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
if (!$checkColumn || $checkColumn->num_rows == 0) {
    // Add category_id column
    $alterResult = $conn->query("ALTER TABLE notes ADD COLUMN category_id INT NULL");
    if ($alterResult) {
        // Try to add foreign key constraint (suppress errors if constraint already exists)
        @$conn->query("ALTER TABLE notes ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL");
    }
    // Re-check after adding
    $checkColumn = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
}

// Ensure is_favorite column exists in notes table
$checkFavoriteColumn = $conn->query("SHOW COLUMNS FROM notes LIKE 'is_favorite'");
if (!$checkFavoriteColumn || $checkFavoriteColumn->num_rows == 0) {
    $conn->query("ALTER TABLE notes ADD COLUMN is_favorite TINYINT(1) DEFAULT 0");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $noteId = isset($data['noteId']) ? intval($data['noteId']) : null;
    $title = isset($data['title']) ? trim($data['title']) : '';
    $content = isset($data['content']) ? $data['content'] : '';
    $categoryId = isset($data['categoryId']) ? (intval($data['categoryId']) > 0 ? intval($data['categoryId']) : null) : null;
    // Handle isFavorite more robustly - accept boolean, int, or string
    $isFavorite = false;
    if (isset($data['isFavorite'])) {
        if (is_bool($data['isFavorite'])) {
            $isFavorite = $data['isFavorite'];
        } else if (is_int($data['isFavorite'])) {
            $isFavorite = $data['isFavorite'] == 1;
        } else if (is_string($data['isFavorite'])) {
            $isFavorite = strtolower($data['isFavorite']) === 'true' || $data['isFavorite'] === '1';
        } else {
            $isFavorite = (bool)$data['isFavorite'];
        }
    }

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
            // Check if columns exist
            $checkCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
            $hasCategoryCol = ($checkCol && $checkCol->num_rows > 0);
            $checkFavCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'is_favorite'");
            $hasFavoriteCol = ($checkFavCol && $checkFavCol->num_rows > 0);
            
            if ($hasCategoryCol && $hasFavoriteCol && $categoryId !== null) {
                $updateStmt = $conn->prepare("UPDATE notes SET title = ?, content = ?, category_id = ?, is_favorite = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
                $updateStmt->bind_param("ssiiii", $title, $content, $categoryId, $isFavorite, $noteId, $userId);
            } else if ($hasCategoryCol && $hasFavoriteCol) {
                $updateStmt = $conn->prepare("UPDATE notes SET title = ?, content = ?, category_id = NULL, is_favorite = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
                $updateStmt->bind_param("ssiii", $title, $content, $isFavorite, $noteId, $userId);
            } else if ($hasCategoryCol && $categoryId !== null) {
                $updateStmt = $conn->prepare("UPDATE notes SET title = ?, content = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
                $updateStmt->bind_param("ssiii", $title, $content, $categoryId, $noteId, $userId);
            } else if ($hasCategoryCol) {
                $updateStmt = $conn->prepare("UPDATE notes SET title = ?, content = ?, category_id = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
                $updateStmt->bind_param("ssii", $title, $content, $noteId, $userId);
            } else {
                $updateStmt = $conn->prepare("UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
                $updateStmt->bind_param("ssii", $title, $content, $noteId, $userId);
            }
            
            if ($updateStmt->execute()) {
                echo json_encode(["success" => true, "noteId" => $noteId, "message" => "Note updated successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "error" => "Update failed: " . $updateStmt->error]);
            }
            $updateStmt->close();
        } else {
            // Note ID doesn't exist or doesn't belong to user, create new
            // Check if columns exist
            $checkCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
            $hasCategoryCol = ($checkCol && $checkCol->num_rows > 0);
            $checkFavCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'is_favorite'");
            $hasFavoriteCol = ($checkFavCol && $checkFavCol->num_rows > 0);
            
            if ($hasCategoryCol && $hasFavoriteCol && $categoryId !== null) {
                $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content, category_id, is_favorite) VALUES (?, ?, ?, ?, ?)");
                $insertStmt->bind_param("issii", $userId, $title, $content, $categoryId, $isFavorite);
            } else if ($hasCategoryCol && $hasFavoriteCol) {
                $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content, is_favorite) VALUES (?, ?, ?, ?)");
                $insertStmt->bind_param("issi", $userId, $title, $content, $isFavorite);
            } else if ($hasCategoryCol && $categoryId !== null) {
                $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content, category_id) VALUES (?, ?, ?, ?)");
                $insertStmt->bind_param("issi", $userId, $title, $content, $categoryId);
            } else {
                $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)");
                $insertStmt->bind_param("iss", $userId, $title, $content);
            }
            
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
        // Check if columns exist
        $checkCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
        $hasCategoryCol = ($checkCol && $checkCol->num_rows > 0);
        $checkFavCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'is_favorite'");
        $hasFavoriteCol = ($checkFavCol && $checkFavCol->num_rows > 0);
        
        if ($hasCategoryCol && $hasFavoriteCol && $categoryId !== null) {
            $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content, category_id, is_favorite) VALUES (?, ?, ?, ?, ?)");
            $insertStmt->bind_param("issii", $userId, $title, $content, $categoryId, $isFavorite);
        } else if ($hasCategoryCol && $hasFavoriteCol) {
            $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content, is_favorite) VALUES (?, ?, ?, ?)");
            $insertStmt->bind_param("issi", $userId, $title, $content, $isFavorite);
        } else if ($hasCategoryCol && $categoryId !== null) {
            $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content, category_id) VALUES (?, ?, ?, ?)");
            $insertStmt->bind_param("issi", $userId, $title, $content, $categoryId);
        } else {
            $insertStmt = $conn->prepare("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)");
            $insertStmt->bind_param("iss", $userId, $title, $content);
        }
        
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

    // Get category filter if provided
    $categoryFilter = isset($_GET['categoryId']) ? intval($_GET['categoryId']) : null;
    
    // Check if columns exist
    $checkFavCol = $conn->query("SHOW COLUMNS FROM notes LIKE 'is_favorite'");
    $hasFavoriteCol = ($checkFavCol && $checkFavCol->num_rows > 0);
    
    // Get all notes for this user (optionally filtered by category)
    // Note: category_id column should exist now (created at top of file)
    if ($categoryFilter !== null && $categoryFilter > 0) {
        if ($hasFavoriteCol) {
            $notesStmt = $conn->prepare("SELECT id, title, content, category_id, is_favorite, created_at, updated_at FROM notes WHERE user_id = ? AND category_id = ? ORDER BY is_favorite DESC, updated_at DESC");
        } else {
            $notesStmt = $conn->prepare("SELECT id, title, content, category_id, created_at, updated_at FROM notes WHERE user_id = ? AND category_id = ? ORDER BY updated_at DESC");
        }
        if (!$notesStmt) {
            // If prepare fails, try without category_id (column might not exist)
            $notesStmt = $conn->prepare("SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC");
            $notesStmt->bind_param("i", $userId);
        } else {
            $notesStmt->bind_param("ii", $userId, $categoryFilter);
        }
    } else {
        if ($hasFavoriteCol) {
            $notesStmt = $conn->prepare("SELECT id, title, content, category_id, is_favorite, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY is_favorite DESC, updated_at DESC");
        } else {
            $notesStmt = $conn->prepare("SELECT id, title, content, category_id, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC");
        }
        if (!$notesStmt) {
            // If prepare fails, try without category_id (column might not exist)
            $notesStmt = $conn->prepare("SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC");
        }
        $notesStmt->bind_param("i", $userId);
    }
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


