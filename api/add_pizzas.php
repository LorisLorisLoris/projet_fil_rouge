<?php
include_once("connexion.php");

// Récupération des données du formulaire
$name = $_POST['name'] ?? '';
$ingredients = $_POST['ingredients'] ?? '';
$price = $_POST['price'] ?? '';
$image = $_FILES['image']['tmp_name'] ?? '';

// Validation des données
if (empty($name) || empty($ingredients) || empty($price) || empty($image)) {
  echo json_encode(['status' => 'error', 'message' => 'Veuillez remplir tous les champs.']);
  exit;
}

// Vérification du type de fichier de l'image
$allowedExtensions = ['jpg', 'jpeg', 'png'];
$extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
if (!in_array(strtolower($extension), $allowedExtensions)) {
  echo json_encode(['status' => 'error', 'message' => 'Seules les images au format JPG, JPEG et PNG sont autorisées.']);
  exit;
}

// Vérification de la taille de l'image
$maxFileSize = 2 * 1024 * 1024; // 2 Mo
if ($_FILES['image']['size'] > $maxFileSize) {
  echo json_encode(['status' => 'error', 'message' => 'La taille maximale de l\'image est de 2 Mo.']);
  exit;
}

// Conversion de l'image en base64
$imageData = base64_encode(file_get_contents($image));

// Requête SQL pour insérer les données dans la table "pizzas"
$sql = "INSERT INTO pizzas (name, ingredients, price, image) VALUES (:name, :ingredients, :price, :image)";

// Préparation de la requête SQL avec PDO
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':ingredients', $ingredients);
$stmt->bindParam(':price', $price);
$stmt->bindParam(':image', $imageData);

// Exécution de la requête SQL
if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'Une erreur s\'est produite lors de l\'ajout de la pizza.']);
}

// Fermeture de la connexion à la base de données
$pdo = null;
?>