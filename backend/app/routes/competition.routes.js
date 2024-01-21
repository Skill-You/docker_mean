const { authJwt } = require("../middlewares");
const competition = require("../controllers/competition.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Créer une nouvelle compétition (nécessite une authentification)
  app.post(
    "/competition/create",
    authJwt.isAuthenticated,
    competition.createCompetition
  );

  // Obtenir la liste de toutes les compétitions (nécessite une authentification)
  app.get(
    "/competition/all",
    authJwt.isAuthenticated,
    competition.getAllCompetitions
  );

  // Obtenir une compétition par son ID (nécessite une authentification)
  app.get(
    "/competetion/:id", // Vérifier la faute de frappe dans le chemin ("/competition" plutôt que "/competetion")
    authJwt.isAuthenticated,
    competition.getCompetitionById
  );

  // Obtenir une compétition par son shortcode (nécessite une authentification)
  app.get(
    "/competition/shortcode/:shortcode",
    authJwt.isAuthenticated,
    competition.getCompetitionByShortCode
  );

  // Obtenir une compétition par son nom (nécessite une authentification)
  app.get(
    "/competition/competitionbyname/:name",
    authJwt.isAuthenticated,
    competition.getCompetitionByName
  );

  // Mettre à jour une compétition par son ID (nécessite une authentification)
  app.post(
    "/competition/update/:id",
    authJwt.isAuthenticated,
    competition.updateCompetition
  );

  // Supprimer une compétition par son ID (nécessite une authentification)
  app.post(
    "/competition/delete/:id",
    authJwt.isAuthenticated,
    competition.deleteCompetition
  );

  // Supprimer toutes les compétitions (nécessite une authentification)
  app.post(
    "/competition/delete/all",
    authJwt.isAuthenticated,
    competition.deleteAllCompetitions
  );

  // Obtenir une compétition par son shortcode (nécessite une authentification)
  app.get(
    "/competition/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    competition.forShortCode
  );
};
