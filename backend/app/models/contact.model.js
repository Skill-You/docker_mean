const mongoose = require("mongoose");

// Définition du modèle de données pour les contacts
const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    senderEmail: {
      type: String,
      required: true // Champ obligatoire : adresse e-mail de l'expéditeur
    },
    heading: {
      type: String,
      required: true // Champ obligatoire : objet du message
    },
    shortcode: {
      type: String // Champ facultatif : code court
    },
    content: {
      type: String,
      required: true // Champ obligatoire : contenu du message
    },
    reply: {
      type: String // Champ facultatif : réponse au message
    },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition" // Référence à la compétition associée
    },
    status: {
      type: String,
      default: "Pending" // Statut par défaut : En attente
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // Référence à l'utilisateur associé
    },
    createdAt: {
      type: Date,
      default: Date.now, // Date de création par défaut
      required: true // Champ obligatoire : date de création
    }
  })
);

module.exports = Contact;
