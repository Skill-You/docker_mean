# mongo/init-db.d/01.Seed.sh
# Script pour initialiser la base de données MongoDB dans un environnement Docker.
# Ce script importe des données depuis un fichier JSON dans la base de données MongoDB.

# La commande 'mongoimport' permet d'importer des données depuis un fichier JSON dans MongoDB.
# --jsonArray : Indique que le fichier JSON contient un tableau d'éléments.
# --authenticationDatabase=admin : Utilise 'admin' comme base de données pour l'authentification.
# --username et --password : Utilisés pour l'authentification avec les identifiants MongoDB.
# --mode upsert : Insère des documents dans la collection si ils n'existent pas, sinon met à jour.
# --host 127.0.0.1 : Spécifie l'adresse locale comme hôte pour la base de données.
# --db $MONGO_DB : Définit le nom de la base de données à utiliser.
# --collection Role : Spécifie la collection dans laquelle importer les données.
# /docker-entrypoint-initdb.d/data.json : Chemin vers le fichier JSON contenant les données à importer.

mongoimport --jsonArray --authenticationDatabase=admin \
   --username=$MONGO_INITDB_ROOT_USERNAME \
   --password=$MONGO_INITDB_ROOT_PASSWORD \
   --mode upsert \
   --host 127.0.0.1 \
   --db $MONGO_DB \
   --collection Role \
   /docker-entrypoint-initdb.d/data.json
