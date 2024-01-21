const { authJwt } = require("../middlewares/");
const player = require("../controllers/player.controller");

module.exports = function (app) {
  // Middleware pour gérer les en-têtes de requête
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Création d'un joueur
  app.post("/player/create", authJwt.isAuthenticated, player.createPlayer);

  // Récupération de tous les joueurs
  app.get("/player/all", authJwt.isAuthenticated, player.getAllPlayers);

  // Approbation d'un joueur par ID
  app.post(
    "/player/approve/:id",
    authJwt.isAuthenticated,
    player.approvePlayer
  );

  // Mise à jour des informations d'un joueur par ID
  app.post("/player/update/:id", authJwt.isAuthenticated, player.updatePlayer);

  // Déclaration d'un MVP (Joueur le plus précieux) par ID
  app.post("/player/mvp/:id", authJwt.isAuthenticated, player.upMvp);

  // Suppression d'un joueur par ID
  app.post("/player/delete/:id", authJwt.isAuthenticated, player.deletePlayer);

  // Suppression de tous les joueurs
  app.post(
    "/player/delete/all",
    authJwt.isAuthenticated,
    player.deleteAllPlayers
  );

  // Récupération des joueurs par académie
  app.get(
    "/player/academy/:id",
    authJwt.isAuthenticated,
    player.playerByAcademy
  );

  // Import en masse de joueurs
  app.post(
    "/player/bulkuploads",
    authJwt.isAuthenticated,
    player.bulkUploadPlayers
  );

  // Téléchargement de fichiers de joueurs
  app.post("/player/upload", authJwt.isAuthenticated, player.upload);

  // Liste des fichiers téléchargés
  app.get("/player/getuploads", authJwt.isAuthenticated, player.getListFiles);

  // Récupération d'un joueur par ID ou EID (External ID)
  app.get("/player/:id", authJwt.isAuthenticated, player.playerByIdOrEID);

  // Récupération des joueurs par équipe
  app.get("/player/team/:id", authJwt.isAuthenticated, player.playerByTeam);

  // Téléchargement d'un fichier spécifique
  app.get("/player/getuploads/:id", authJwt.isAuthenticated, player.download);

  // Import multiple de joueurs
  app.post("/player/multiupload", authJwt.isAuthenticated, player.multiUpload);

  // Approbation de plusieurs joueurs en une seule fois
  app.post(
    "/player/approvemulitple",
    authJwt.isAuthenticated,
    player.approveMulitplePlayers
  );

  // Récupération des joueurs pour une compétition donnée
  app.get(
    "/player/forcompetition/:competition",
    authJwt.isAuthenticated,
    player.forCompetition
  );

  // Récupération des joueurs pour un shortcode donné
  app.get(
    "/player/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    player.forShortCode
  );
};
