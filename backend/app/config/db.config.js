// Ce module exporte une configuration pour la base de données MongoDB et une variable secrète utilisée dans l'application backend.

// Configuration de la base de données MongoDB
module.exports = {
  mongodb: {
    // URI de la base de données MongoDB, composée en utilisant les variables d'environnement
    uri:
      "mongodb://" +
      process.env.MONGO_DB_USERNAME +
      ":" +
      process.env.MONGO_DB_PASSWORD +
      "@" +
      process.env.MONGO_DB_HOST +
      (process.env.MONGO_DB_PORT
        ? ":" + process.env.MONGO_DB_PORT + "/"
        : "/") +
      process.env.MONGO_DB_DATABASE +
      process.env.MONGO_DB_PARAMETERS,
  },
  // Variable secrète utilisée dans l'application backend
  secret: process.env.SECRET,
};
