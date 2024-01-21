const { authJwt } = require("../middlewares/");
const team = require("../controllers/team.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route pour créer une équipe
  app.post("/team/create", authJwt.isAuthenticated, team.createTeam);

  // Route pour récupérer toutes les équipes
  app.get("/team/all", authJwt.isAuthenticated, team.getAllTeams);

  // Route pour récupérer une équipe par ID
  app.get("/team/:id", authJwt.isAuthenticated, team.getTeamById);

  // Route pour récupérer une équipe par ID d'académie
  app.get(
    "/team/foracademy/:id",
    authJwt.isAuthenticated,
    team.getTeamByAcademyId
  );

  // Route pour mettre à jour une équipe par ID
  app.post("/team/update/:id", authJwt.isAuthenticated, team.updateTeam);

  // Route pour supprimer une équipe par ID
  app.post("/team/delete/:id", authJwt.isAuthenticated, team.deleteTeam);

  // Route pour supprimer toutes les équipes
  app.post("/team/delete/all", authJwt.isAuthenticated, team.deleteAllTeams);

  // Route pour récupérer les équipes pour une compétition donnée
  app.get(
    "/team/forcompetition/:competition",
    authJwt.isAuthenticated,
    team.forCompetition
  );

  // Route pour récupérer les équipes pour un code court donné
  app.get(
    "/team/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    team.forShortCode
  );
};
