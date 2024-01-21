# Image Mongo

## Initialisation de données dans Mongo DB

Dans ce projet, nous utilisons l'image de MongoDB. Pour initialiser les données, nous utilisons le dossier `docker-entrypoint-initdb.d` et le script shell se trouve dans le fichier `init-mongo.sh`.

Nous utilisons également `mongoimport` pour initialiser les données :

```bat
mongoimport --jsonArray --authenticationDatabase=admin \
   --username=$MONGO_INITDB_ROOT_USERNAME \
   --password=$MONGO_INITDB_ROOT_PASSWORD \
   --mode upsert \
   --host 127.0.0.1 \
   --db $MONGO_DB \
   --collection Contacts \
   /docker-entrypoint-initdb.d/data.json
```

Ici, nous avons ajouté les identifiants de la base de données pour notre nouvelle base de données.

```bat
#!/bin/bash
set -e

mongo <<EOF
use admin
db.createUser({
  user: '$MONGO_DB_USERNAME',
  pwd:  '$MONGO_DB_PASSWORD',
  roles: [
     { role: 'readWrite', db: '$MONGO_DB'}]
})
EOF
```

### Explications

1. **Utilisation de `mongoimport`** : Cette commande permet d'importer des données au format JSON dans la base de données. Elle est utilisée ici pour peupler la collection `Contacts` avec des données initiales.

   - `--jsonArray` : Indique que les données sont au format tableau JSON.
   - `--authenticationDatabase=admin` : Spécifie la base de données d'authentification (ici `admin`).
   - `--username` et `--password` : Identifiants pour l'accès à la base de données.
   - `--mode upsert` : Mode d'importation des données (ici `upsert` permet de mettre à jour les données existantes ou d'en ajouter de nouvelles).
   - `--host` : Adresse de l'hôte de la base de données (ici `127.0.0.1` pour une base de données locale).
   - `--db` et `--collection` : Nom de la base de données et de la collection où importer les données.
   - Chemin du fichier JSON contenant les données (`/docker-entrypoint-initdb.d/data.json`).

2. **Création d'un utilisateur** : Le script shell crée un nouvel utilisateur pour la base de données avec des droits spécifiques.

   - `use admin` : Sélectionne la base de données `admin`.
   - `db.createUser` : Crée un nouvel utilisateur avec un nom d'utilisateur (`$MONGO_DB_USERNAME`), un mot de passe (`$MONGO_DB_PASSWORD`) et des rôles (ici `readWrite` pour la base de données `$MONGO_DB`).
