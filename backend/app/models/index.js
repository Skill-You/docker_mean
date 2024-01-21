const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// Modèles de données pour la base de données
db.user = require("./user.model"); // Modèle pour les utilisateurs
db.role = require("./role.model"); // Modèle pour les rôles
db.academy = require("./academy.model"); // Modèle pour les académies
db.fixture = require("./fixture.model"); // Modèle pour les matchs
db.league = require("./league.model"); // Modèle pour les ligues
db.player = require("./player.model"); // Modèle pour les joueurs
db.team = require("./team.model"); // Modèle pour les équipes
db.competition = require("./competition.model"); // Modèle pour les compétitions
db.increment = require("./increment.model"); // Modèle pour les incréments
db.contact = require("./contact.model"); // Modèle pour les contacts
db.settings = require("./settings.model"); // Modèle pour les paramètres

// Rôles disponibles dans l'application
db.ROLES = ["user", "admin", "coach", "referee", "superadmin"];

module.exports = db;
