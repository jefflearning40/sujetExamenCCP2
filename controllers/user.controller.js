// ==============================
// Fichier : user.controller.js
// ==============================

import db from "../db.js";
import bcrypt from "bcrypt";

// ==================== GET : tous les utilisateurs ====================
export const getAllUsers = (req, res) => {
  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération des utilisateurs :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
};


// ==================== GET : un utilisateur par ID ====================
export const getUserById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(results[0]);
  });
};


// ==================== POST : création d’un utilisateur ====================
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, password_hash, role], (err, result) => {
      if (err) {
        console.error("❌ Erreur lors de l’insertion :", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      res.status(201).json({
        message: "Utilisateur ajouté",
        id: result.insertId,
        data: { name, email, role }
      });
    });
  } catch (err) {
    console.error("❌ Erreur bcrypt :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// ==================== PUT : mise à jour d’un utilisateur ====================
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const sql = `
      UPDATE users
      SET name = ?, email = ?, password_hash = ?, role = ?
      WHERE id = ?
    `;

    db.query(sql, [name, email, password_hash, role, id], (err, result) => {
      if (err) {
        console.error("❌ Erreur lors de la mise à jour :", err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json({
        message: "Utilisateur mis à jour",
        data: { id, name, email, role }
      });
    });
  } catch (err) {
    console.error("❌ Erreur bcrypt :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// ==================== DELETE : suppression d’un utilisateur ====================
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Erreur lors de la suppression :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès", id });
  });
};
