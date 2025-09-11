-- Création de la base de données
CREATE DATABASE IF NOT EXISTS TMR;
USE TMR;

-- Table des utilisateurs
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nameuser VARCHAR(100) NOT NULL,
    emailuser VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('benevole', 'association') NOT NULL
);

-- Table des missions
CREATE TABLE mission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    descriptif TEXT
);

-- Table des candidatures (relation entre user et mission)
CREATE TABLE candidature (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_mission INT NOT NULL,
    date_candidature DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_mission) REFERENCES mission(id) ON DELETE CASCADE
);
