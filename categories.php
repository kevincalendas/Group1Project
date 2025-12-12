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

// Create categories table if it doesn't exist
$createTableSQL = "CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    UNIQUE KEY unique_user_category (user_id, name)
)";

if (!$conn->query($createTableSQL)) {
    // Table might already exist, continue
}

// Add category_id to notes table if it doesn't exist (handle errors gracefully)
$checkColumn = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
if ($checkColumn->num_rows == 0) {
    $conn->query("ALTER TABLE notes ADD COLUMN category_id INT NULL");
    // Add foreign key constraint
    $conn->query("ALTER TABLE notes ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $categoryName = isset($data['name']) ? trim($data['name']) : '';
    $action = isset($data['action']) ? $data['action'] : 'create';
    
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
    
    if ($action === 'create') {
        if (empty($categoryName)) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Category name is required"]);
            $conn->close();
            exit();
        }
        
        // Create category
        $insertStmt = $conn->prepare("INSERT INTO categories (user_id, name) VALUES (?, ?)");
        if (!$insertStmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
            $conn->close();
            exit();
        }
        
        $insertStmt->bind_param("is", $userId, $categoryName);
        
        if ($insertStmt->execute()) {
            $categoryId = $conn->insert_id;
            echo json_encode(["success" => true, "categoryId" => $categoryId, "name" => $categoryName]);
        } else {
            if (strpos($conn->error, "Duplicate entry") !== false) {
                http_response_code(409);
                echo json_encode(["success" => false, "error" => "Category already exists"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "error" => "Insert failed: " . $insertStmt->error]);
            }
        }
        $insertStmt->close();
    } elseif ($action === 'delete') {
        $categoryId = isset($data['categoryId']) ? intval($data['categoryId']) : 0;
        
        if ($categoryId <= 0) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Category ID is required"]);
            $conn->close();
            exit();
        }
        
        // Delete category (notes will have category_id set to NULL due to ON DELETE SET NULL)
        $deleteStmt = $conn->prepare("DELETE FROM categories WHERE id = ? AND user_id = ?");
        if (!$deleteStmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
            $conn->close();
            exit();
        }
        
        $deleteStmt->bind_param("ii", $categoryId, $userId);
        
        if ($deleteStmt->execute()) {
            echo json_encode(["success" => true, "message" => "Category deleted"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Delete failed: " . $deleteStmt->error]);
        }
        $deleteStmt->close();
    }
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
    
    // Get all categories for this user
    $categoriesStmt = $conn->prepare("SELECT id, name, created_at FROM categories WHERE user_id = ? ORDER BY name ASC");
    if (!$categoriesStmt) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
        $conn->close();
        exit();
    }
    
    $categoriesStmt->bind_param("i", $userId);
    $categoriesStmt->execute();
    $categoriesResult = $categoriesStmt->get_result();
    
    $categories = [];
    while ($row = $categoriesResult->fetch_assoc()) {
        $categories[] = $row;
    }
    
    echo json_encode(["success" => true, "categories" => $categories]);
    $categoriesStmt->close();
} else if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : '';
    $categoryId = isset($data['categoryId']) ? intval($data['categoryId']) : 0;
    
    if (empty($userEmail) || $categoryId <= 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "User email and category ID are required"]);
        $conn->close();
        exit();
    }
    
    // Get user ID
    $userStmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
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
    
    // Delete category
    $deleteStmt = $conn->prepare("DELETE FROM categories WHERE id = ? AND user_id = ?");
    $deleteStmt->bind_param("ii", $categoryId, $userId);
    
    if ($deleteStmt->execute()) {
        echo json_encode(["success" => true, "message" => "Category deleted"]);
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

