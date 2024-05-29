<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chatbot";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//  formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['inscription_type'])) {
        if ($_POST['inscription_type'] == "etudiant") {
            // Inscription en tant qu'étudiant
            $prenom = $_POST['prenom'];
            $nom = $_POST['nom'];
            $email = $_POST['email'];
            $mot_de_passe = $_POST['mot_de_passe'];
            $numEtud = $_POST['numEtud'];
            $idClasse = $_POST['idClasse'];

            // Requête d'insertion pour les étudiants
            $sql = "INSERT INTO etudiant (numEtud, prenom, nom, DNN, email, idClasse)
                    VALUES ('$numEtud', '$prenom', '$nom', NOW(), '$email', '$idClasse')";

            if ($conn->query($sql) === TRUE) {
                echo "Inscription en tant qu'étudiant réussie";
            } else {
                echo "Erreur: " . $sql . "<br>" . $conn->error;
            }
        } elseif ($_POST['inscription_type'] == "professeur") {
            // Inscription en tant que professeur
            $prenom = $_POST['prenom'];
            $nom = $_POST['nom'];
            $email = $_POST['email'];
            $telephone = $_POST['telephone'];
            $mot_de_passe = $_POST['mot_de_passe'];
            $matiere = $_POST['matiere'];
            $classe = $_POST['classe'];

            // Requête d'insertion pour les professeurs
            $sql = "INSERT INTO ens (prenom, nom, DNN, Classe, email)
                    VALUES ('$prenom', '$nom', NOW(), '$classe', '$email')";

            if ($conn->query($sql) === TRUE) {
                echo "Inscription en tant que professeur réussie";
            } else {
                echo "Erreur: " . $sql . "<br>" . $conn->error;
            }
        }
    }
}

// Fermer la connexion
$conn->close();
?>
