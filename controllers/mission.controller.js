// ==============================
// Fichier : mission.controller.js
// ==============================

import db from "../db.js";

// ==================== GET : toutes les missions ====================
export const getAllMissions = (req, res) => {
  const sql = `
    SELECT m.id, m.title, m.description, m.date_mission, m.created_at,
           u.name AS association_name, u.email AS association_email
    FROM missions m
    JOIN users u ON m.association_id = u.id
    ORDER BY m.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
};


// ==================== GET : une mission par ID ====================
export const getMissionById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT m.id, m.title, m.description, m.date_mission, m.created_at,
           u.name AS association_name, u.email AS association_email
    FROM missions m
    JOIN users u ON m.association_id = u.id
    WHERE m.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Erreur lors de la récupération :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Mission non trouvée" });
    }

    res.json(results[0]);
  });
};


// ==================== POST : création d'une mission ====================
export const createMission = (req, res) => {
  const { title, description, date_mission, association_id } = req.body;

  if (!title || !description || !date_mission || !association_id) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const sql = `
    INSERT INTO missions (title, description, date_mission, association_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [title, description, date_mission, association_id], (err, result) => {
    if (err) {
      console.error("❌ Erreur lors de l'insertion :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    res.status(201).json({
      message: "Mission ajoutée",
      id: result.insertId,
      data: { title, description, date_mission, association_id }
    });
  });
};


// ==================== PUT : mise à jour d'une mission ====================
export const updateMission = (req, res) => {
  const { id } = req.params;
  const { title, description, date_mission } = req.body;

  if (!title || !description || !date_mission) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const sql = `
    UPDATE missions
    SET title = ?, description = ?, date_mission = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, date_mission, id], (err, result) => {
    if (err) {
      console.error("❌ Erreur lors de la mise à jour :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mission non trouvée" });
    }

    res.json({
      message: "Mission mise à jour",
      data: { id, title, description, date_mission }
    });
  });
};


// ==================== DELETE : suppression d'une mission ====================
export const deleteMission = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM missions WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Erreur lors de la suppression :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mission non trouvée" });
    }

    res.json({ message: "Mission supprimée avec succès", id });
  });
};
