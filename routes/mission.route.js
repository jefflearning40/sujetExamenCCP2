import express from "express";
import db from "../db.js";

const router = express.Router();

// GET : toutes les missions avec le nom de l'association
router.get("/get", (req, res) => {
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
});

// GET : une mission par ID
router.get("/:id", (req, res) => {
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
});

// POST (insertion dans MySQL)
router.post("/post", (req, res) => {
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
});

export default router;
