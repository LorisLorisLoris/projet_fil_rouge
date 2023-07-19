<?php

// Informations de connexion à la base de données
$server = "localhost";
$user = "root";
$password = "root";
$dbname = "pizzeriaFiloRosso";

// Connexion à la base de données avec PDO
try {
    $pdo = new PDO("mysql:host=$server;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
    exit();
}