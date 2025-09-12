import express from "express";
import userRoutes from "./routes/user.route.js"; // import du routeur

const app = express();
const port = 3000;

// Middleware JSON si besoin
app.use(express.json());

// On "branche" le routeur pour toutes les routes commençant par /user
app.use("/user", userRoutes);

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
