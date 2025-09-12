import express from "express";

const router = express.Router();

// lire un fichier
router.get("/get", (req, res) => {
 
    res.send("read datas");
});

// Créer un fichier
router.post("/post", (req, res) => {
  
    res.send("add datas ",req.body)
});

// UPDATE (remplace entièrement)
router.put("/put", (req, res) => {
  res.send("update datas");
});

// MODIFY (modifie partiellement)
router.patch("/patch", (req, res) => {
  res.send("modify datas");
});

// DELETE
router.delete("/delete", (req, res) => {
  res.send("delete datas");
});

export default router;
