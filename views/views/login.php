<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $email = $_POST["email"];
    $password = $_POST["password"];

    
    $valid_email = "Pitici@gmail.com";
    $valid_password = "Passer";

    if ($email == $valid_email && $password == $valid_password) {
        echo "Connexion réussie!";
        
    } else {
        echo "Nom d'utilisateur ou mot de passe incorrect!";
    }
}
?>
