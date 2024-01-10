<?php
// Database configuration
$servername = "localhost";
$username = "root"; // default username for MySQL
$password = ""; // default password for MySQL
$dbname = "login"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect value of input field
    $email = $_POST['email'];
    $password = $_POST['password']; // This should be hashed in a real-world scenario

    // Prepare an insert statement
    $sql = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $sql->bind_param("ss", $email, $password);

    // Execute the prepared statement
    if ($sql->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close statement and connection
    $sql->close();
    $conn->close();
}
?>
