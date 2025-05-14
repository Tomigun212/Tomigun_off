<?php
$utilisateur_correct = "admin";
$mot_de_passe_correct = "supersecret";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = $_POST["username"] ?? "";
    $pass = $_POST["password"] ?? "";

    if ($user === $utilisateur_correct && $pass === $mot_de_passe_correct) {
        echo "Connexion réussie";
    } else {
        echo "Identifiants incorrects";
    }
} else {
    echo "Veuillez envoyer les données via POST.";
}
?>
