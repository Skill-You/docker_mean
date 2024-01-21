// Importation du module mongoose pour la gestion de la base de données
const mongoose = require("mongoose");

// Définition du modèle de données Settings (paramètres)
const Settings = mongoose.model(
  "Settings",
  new mongoose.Schema({
    // Champ pour le nom des paramètres
    settingsName: {
      type: String
    },
    // Champ pour la valeur des paramètres
    settingsValue: {
      type: String
    }
  })
);

// Exportation du modèle Settings pour une utilisation ultérieure
module.exports = Settings;
