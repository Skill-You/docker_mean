const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route pour accéder au contenu public (accessible à tous les utilisateurs)
  app.get("/api/content", controller.allAccess);

  // Route pour le tableau de bord de l'utilisateur (authentifié)
  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

  // Route pour le tableau de bord du modérateur (authentifié en tant que modérateur)
  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  // Route pour le tableau de bord de l'administrateur (authentifié en tant qu'administrateur)
  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Route pour obtenir la liste de tous les utilisateurs (authentifié en tant qu'administrateur)
  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );

  // Route pour créer un nouvel utilisateur (authentifié en tant qu'administrateur)
  app.post(
    "/api/users/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createUser
  );

  // Route pour obtenir les informations d'un utilisateur par ID ou EID (authentifié)
  app.get("/api/users/:id", authJwt.isAuthenticated, controller.UserByIdOrEID);

  // Route pour envoyer un email administratif à un utilisateur (authentifié)
  app.get(
    "/api/users/notifyemail/:id",
    authJwt.isAuthenticated,
    controller.AdminEmailById
  );

  // Route pour mettre à jour les informations d'un utilisateur (authentifié)
  app.post(
    "/api/users/update/:id",
    authJwt.isAuthenticated,
    controller.updateUser
  );

  // Route pour supprimer un utilisateur (authentifié)
  app.post(
    "/api/users/delete/:id",
    authJwt.isAuthenticated,
    controller.deleteUser
  );

  // Route pour créer un contact (authentifié)
  app.post(
    "/api/user/createcontact",
    authJwt.isAuthenticated,
    controller.createContact
  );

  // Route pour obtenir tous les contacts d'un coach (authentifié)
  app.get(
    "/api/user/contents/:id",
    authJwt.isAuthenticated,
    controller.allContactsByIdCoach
  );

  // Route pour obtenir tous les contacts (authentifié)
  app.get(
    "/api/user/contents",
    authJwt.isAuthenticated,
    controller.getAllContacts
  );

  // Route pour mettre à jour un contact (authentifié)
  app.post(
    "/api/user/contentsupdate/:id",
    authJwt.isAuthenticated,
    controller.updateContact
  );

  // Route pour supprimer un contact (authentifié)
  app.post(
    "/api/user/contentdelete/:id",
    authJwt.isAuthenticated,
    controller.contentDelete
  );

  // Route pour obtenir les informations pour une compétition spécifique (authentifié)
  app.get(
    "/api/user/forcompetition/:competition",
    authJwt.isAuthenticated,
    controller.forCompetition
  );

  // Route pour obtenir les informations pour un shortcode spécifique (authentifié)
  app.get(
    "/api/user/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    controller.forShortcode
  );

  // Route pour obtenir les informations pour une compétition spécifique (authentifié)
  app.get(
    "/api/user/contents/forcompetition/:competition",
    authJwt.isAuthenticated,
    controller.forContentsCompetition
  );

  // Route pour obtenir les informations pour un shortcode spécifique (authentifié)
  app.get(
    "/api/user/contents/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    controller.contentForShortCode
  );
};
