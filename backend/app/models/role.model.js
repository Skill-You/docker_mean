const mongoose = require("mongoose");

// Définition du modèle de données pour les rôles
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

// Export du modèle Role
module.exports = Role;
