const ObjectId = require('mongodb').ObjectId;
const db = require("../models");
const Roles = db.role;

// Fonction pour obtenir tous les rôles
exports.allRoles = async (req, res) => {
    // Récupérer tous les rôles dans la base de données
    const roles = await Roles.find({});

    // Envoyer la liste des rôles au format JSON en réponse
    res.status(200).json(roles);
};
