// Importation des modules nécessaires
const util = require("util");
const multer = require("multer");

// Définition de la taille maximale autorisée pour les fichiers
const maxSize = 2 * 1024 * 1024;

// Configuration du stockage des fichiers téléchargés avec Multer
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Spécifie le répertoire de destination pour les fichiers
    cb(null, __basedir + "/public/resources/assets/");
  },
  filename: (req, file, cb) => {
    // Définit le nom du fichier téléchargé comme étant le même que le nom original
    // de fichier du client
    cb(null, file.originalname);
  },
});

// Configuration de l'objet multer pour gérer les téléchargements de fichiers
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");  // Le champ de formulaire 'file' doit correspondre au champ HTML

// Convertit la fonction de gestion des téléchargements de fichiers en une promesse
let uploadFileMiddleware = util.promisify(uploadFile);

// Exportation du middleware de téléchargement de fichiers
module.exports = uploadFileMiddleware;
