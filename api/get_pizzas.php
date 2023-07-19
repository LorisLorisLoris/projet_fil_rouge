<?php
include_once("connexion.php");

// Requête pour récupérer les pizzas
$sql = "SELECT id, name, ingredients, price, image FROM pizzas";
$stmt = $pdo->prepare($sql);
$stmt->execute();

// Création d'un tableau pour stocker les pizzas
$pizzas = array();

// Parcours des résultats de la requête
while ($row = $stmt->fetch())
{
    // Création d'un tableau pour stocker les données d'une pizza
    $pizza = array(
        "id" => $row["id"],
        "name" => $row["name"],
        "ingredients" => $row["ingredients"],
        "price" => $row["price"],
        "image" => $row["image"]
    );
    
    // Ajout de la pizza au tableau de toutes les pizzas
    array_push($pizzas, $pizza);
}

// Encodage des pizzas en JSON et renvoi au client
echo json_encode($pizzas);
?>