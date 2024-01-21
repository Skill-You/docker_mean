const mongoose = require("mongoose");

// Définition du modèle Player
const Player = mongoose.model(
  "Player",
  new mongoose.Schema({
    // Prénom du joueur (chaîne de caractères)
    firstName: {
      type: String,
      required: true
    },
    // Nom de famille du joueur (chaîne de caractères)
    lastName: {
      type: String,
      required: true
    },
    // Date de naissance du joueur (timestamp)
    dob: {
      type: Number,
      required: true
    },
    // Code court du joueur (chaîne de caractères)
    shortcode: {
      type: String
    },
    // Genre du joueur (chaîne de caractères)
    gender: {
      type: String,
      required: true
    },
    // Numéro d'équipe du joueur (nombre)
    squadNo: {
      type: Number,
      required: true
    },
    // Référence à la ligue du joueur (ObjectId)
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League"
    },
    // Référence à l'académie du joueur (ObjectId)
    academy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Academy"
    },
    // Référence à l'équipe du joueur (ObjectId)
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    // Référence à la compétition du joueur (ObjectId)
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition"
    },
    // Numéro de joueur (nombre, unique)
    playerNo: {
      type: Number,
      unique: true,
      required: true
    },
    // Numéro d'identification des Emirats (chaîne de caractères)
    emiratesIdNo: {
      type: String,
      required: true
    },
    // Image de la carte d'identité des Emirats (chaîne de caractères, par défaut null)
    eidFront: {
      type: String,
      default: null,
      required: false
    },
    // Image du dos de la carte d'identité des Emirats (chaîne de caractères, par défaut null)
    eidBack: {
      type: String,
      default: null,
      required: false
    },
    // Image du joueur (chaîne de caractères, par défaut null)
    playerImage: {
      type: String,
      default: null,
      required: false
    },
    // Statut du joueur (chaîne de caractères, par défaut null)
    playerStatus: {
      type: String,
      default: null,
      required: false
    },
    // Référence à la compétition du joueur (ObjectId)
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition"
    },
    // Liste des équipes supérieures dans lesquelles le joueur joue (tableau d'ObjectId, par défaut null)
    playingUp: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        required: false
      }
    ],
    // Liste des équipes supérieures dans lesquelles le joueur est actuellement (tableau d'ObjectId, par défaut null)
    playingUpTeam: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        required: false
      }
    ],
    // Joueur de la partie la plus précieuse (booléen, par défaut false)
    mvp: {
      type: Boolean,
      default: false
    },
    // Référence à l'utilisateur associé au joueur (ObjectId)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // Date de création du joueur (Date, par défaut la date actuelle)
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    }
  })
);

module.exports = Player;
