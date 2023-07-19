<?php
include_once("connexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $pizzaType = $_POST["pizzaType"];
    $quantity = $_POST["quantity"];
    $date = date("Y-m-d");

    $sql = "INSERT INTO orders (type, quantity, date) VALUES ('$pizzaType', '$quantity', '$date')";

    if ($conn->query($sql) === TRUE) {
        echo "Commande enregistrée avec succès";
    } else {
        echo "Erreur lors de l'enregistrement de la commande : " . $conn->error;
    }
}

$conn->close();
?>
