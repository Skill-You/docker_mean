// Importation des modules requis
const { authJwt } = require("../middlewares/");
const dashboard = require("../controllers/dashboard.controller");

// Exportation de la fonction middleware pour la configuration des routes de tableau de bord
module.exports = function (app) {
  // Middleware pour gérer les en-têtes de requête CORS (Cross-Origin Resource Sharing)
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // Définition de la route pour récupérer tous les graphiques du tableau de bord
  app.get("/dashboard/allgraphs", authJwt.isAuthenticated, dashboard.getDashboardContents);
};
