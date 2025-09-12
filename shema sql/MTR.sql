-- =========================
-- Base de données et options
-- =========================

-- Crée la base "mtr" si elle n'existe pas déjà, avec l'encodage UTF-8 complet (emoji OK)
CREATE DATABASE IF NOT EXISTS mtr
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Indique qu'on va travailler dans la base "mtr"
USE mtr;

-- =================================
-- Table "users" (utilisateurs)
-- Bénévoles ET Associations
-- =================================
CREATE TABLE users (
  -- Identifiant unique auto-incrémenté
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Nom  (obligatoire)
  name VARCHAR(100) NOT NULL,

  -- Email unique  et obligatoire
  email VARCHAR(150) UNIQUE NOT NULL,

  -- Mot de passe haché 
  password_hash VARCHAR(255) NOT NULL,

  -- Rôle de l'utilisateur : BENEVOLE ou ASSOCIATION (obligatoire)
  role ENUM('BENEVOLE','ASSOCIATION') NOT NULL,

  -- Date/heure de création automatique, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================
-- Table "missions"
-- faite par une association
-- ==========================
CREATE TABLE missions (
  -- Identifiant unique auto-incrémenté
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Titre de la mission (obligatoire)
  title VARCHAR(150) NOT NULL,

  -- Description détaillée (obligatoire) txt parcequ'on est pas limité en taille
  description TEXT NOT NULL,

  -- Date/heure prévue pour la mission (obligatoire)
  date_mission DATETIME NOT NULL,

  -- Référence à l'association qui a créé la mission (obligatoire)
  association_id INT NOT NULL,

  -- Date/heure de création automatique
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- les foreign key : association_id doit correspondre à un users.id
  CONSTRAINT fk_mission_association
    FOREIGN KEY (association_id) REFERENCES users(id)
      
) ENGINE=InnoDB;

-- Index utile pour les jointures (missions -> users)
CREATE INDEX idx_missions_association_id ON missions (association_id);
