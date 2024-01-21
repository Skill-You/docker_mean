// Import des middlewares pour l'authentification
const { authJwt } = require("../middlewares/");
// Import du contrôleur de ligue
const league = require("../controllers/league.controller");

module.exports = function (app) {
  // Middleware pour autoriser certaines en-têtes dans les requêtes
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route pour la création d'une nouvelle ligue
  app.post("/league/create", authJwt.isAuthenticated, league.createLeague);

  // Route pour obtenir toutes les ligues
  app.get("/league/all", authJwt.isAuthenticated, league.getLeagues);

  // Route pour obtenir une ligue par son identifiant
  app.get("/league/:id", authJwt.isAuthenticated, league.getLeagueById);

  // Route pour mettre à jour une ligue existante
  app.post("/league/update/:id", authJwt.isAuthenticated, league.updateLeague);

  // Route pour supprimer une ligue par son identifiant
  app.post("/league/delete/:id", authJwt.isAuthenticated, league.deleteLeague);

  // Route pour supprimer toutes les ligues
  app.post(
    "/league/delete/all",
    authJwt.isAuthenticated,
    league.deleteAllLeagues
  );

  // Route pour obtenir les ligues liées à une compétition spécifique
  app.get(
    "/league/forcompetition/:competition",
    authJwt.isAuthenticated,
    league.forCompetition
  );

  // Route pour obtenir les ligues liées à un shortcode spécifique
  app.get(
    "/league/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    league.forShortCode
  );
};
