// ==========================
// Fichier : middlewares/auth.js
// ==========================

// On importe la librairie jsonwebtoken qui permet de créer et vérifier des JWT
import jwt from "jsonwebtoken";

// On définit un middleware (une fonction qui s’exécute avant la route finale)
export const authMiddleware = (req, res, next) => {
  // On récupère la valeur de l'en-tête "Authorization" envoyé par le client
  const authHeader = req.headers["authorization"];

  // Si le header est absent → pas de token → on refuse l’accès
  if (!authHeader) {
    return res.status(401).json({ error: "Token manquant, accès non autorisé" });
  }

  // Le format attendu est "Bearer <token>", donc on sépare la chaîne
  // Exemple : "Bearer eyJhbGciOi..." → on garde seulement la 2e partie (le vrai token)
  const token = authHeader.split(" ")[1];

  // Si après séparation il n’y a pas de token → format incorrect
  if (!token) {
    return res.status(401).json({ error: "Format du token invalide" });
  }

  try {
    // On vérifie le token avec la clé secrète stockée dans .env (JWT_SECRET)
    // jwt.verify() décode le token et vérifie qu’il n’a pas été modifié ou qu'il n'est plus bon
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On ajoute les infos du token (id, role, etc.) dans req.user
    // comme ça elles sont disponibles dans les routes protégées
    req.user = decoded;

    // Si tout est bon → on passe à la suite (la route demandée)
    next();
  } catch (err) {
    // Si le token est expiré ou invalide → erreur 403 (interdit)
    console.error(" Erreur vérification JWT :", err);
    return res.status(403).json({ error: "Token invalide ou expiré" });
  }
};
