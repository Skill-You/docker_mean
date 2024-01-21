const mongoose = require("mongoose");

// Modèle de données pour une académie dans le club de football
const Academy = mongoose.model(
  "Academy",
  new mongoose.Schema({
    // Nom de l'académie
    academyName: {
      type: String,
      required: true
    },
    // Logo de l'académie (doit être unique)
    logo: {
      type: String,
      unique: true
    },
    // Couleur de l'académie
    color: {
      type: String
    },
    // Code court de l'académie
    shortcode: {
      type: String
    },
    // Compétition associée à l'académie (référence à l'objet Competition)
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition"
    },
    // Liste des entraîneurs de l'académie (référence à des objets User)
    coach: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    // Administrateur de l'académie (référence à un objet User, par défaut null)
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    // Date de création de l'académie (par défaut à la date actuelle)
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }
  })
);

module.exports = Academy;
