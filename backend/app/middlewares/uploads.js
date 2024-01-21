const util = require("util");
const multer = require("multer");
const path = require('path');
const maxSize = 2 * 1024 * 1024;

// Configuration du stockage des fichiers téléchargés
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/resources/assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Configuration du middleware de téléchargement de fichiers
let uploadFiles = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);

    // Vérification de l'extension du fichier pour n'accepter que les images
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Seules les images sont autorisées'))
    }
    callback(null, true)
  },
}).array("files");

// Utilisation de promisify pour rendre le middleware asynchrone
let uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
