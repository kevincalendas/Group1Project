<?php
// One-time setup script to add category support to the database
// Run this once to set up the categories table and add category_id to notes

$conn = mysqli_connect("localhost", "meow", "Kingbunner123", "notecode");

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

echo "Setting up categories...\n";

// Create categories table
$createCategoriesTable = "CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    UNIQUE KEY unique_user_category (user_id, name)
)";

if ($conn->query($createCategoriesTable)) {
    echo "✓ Categories table created/verified\n";
} else {
    echo "✗ Error creating categories table: " . $conn->error . "\n";
}

// Check if category_id column exists
$checkColumn = $conn->query("SHOW COLUMNS FROM notes LIKE 'category_id'");
if (!$checkColumn || $checkColumn->num_rows == 0) {
    // Add category_id column
    if ($conn->query("ALTER TABLE notes ADD COLUMN category_id INT NULL")) {
        echo "✓ Added category_id column to notes table\n";
        
        // Try to add foreign key constraint
        $fkResult = $conn->query("ALTER TABLE notes ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL");
        if ($fkResult) {
            echo "✓ Added foreign key constraint\n";
        } else {
            echo "⚠ Foreign key constraint may already exist or categories table issue: " . $conn->error . "\n";
        }
    } else {
        echo "✗ Error adding category_id column: " . $conn->error . "\n";
    }
} else {
    echo "✓ category_id column already exists\n";
}

echo "\nSetup complete!\n";
$conn->close();
?>

