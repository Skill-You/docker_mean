// Importation du module mongoose pour la gestion de la base de données MongoDB
const mongoose = require("mongoose");

// Définition du modèle "Increment" pour la collection MongoDB
const Increment = mongoose.model(
  "Increment",
  new mongoose.Schema({
    // Identifiant unique de l'objet
    _id: {
      type: String,
      default: null,
      required: false
    },
    // Nom associé à l'objet (peut être nul)
    name: {
      type: String,
      default: null,
      required: false
    },
    // Valeur numérique de la séquence (obligatoire)
    sequence_value: {
      type: Number,
      required: true
    }
  })
);

// Exportation du modèle "Increment" pour une utilisation ultérieure
module.exports = Increment;
