import express from "express";
import userRoutes from "./routes/user.route.js"; // import du routeur
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// On "branche" le routeur pour toutes les routes commençant par /user
app.use("/user", userRoutes);

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
