#!/bin/bash
# Ce script initialise un utilisateur MongoDB dans la base de données.
# Il est exécuté dans un environnement Bash.

# Arrête le script en cas d'erreur.
set -e

# Connexion à MongoDB et exécution des commandes suivantes.
mongosh <<EOF
# Utilisation de la base de données 'admin'.
use admin

# Création d'un nouvel utilisateur. Les variables d'environnement suivantes doivent être définies :
# MONGO_DB_USERNAME : le nom d'utilisateur pour MongoDB (à conserver en anglais).
# MONGO_DB_PASSWORD : le mot de passe pour cet utilisateur (à conserver en anglais).
# MONGO_DB : le nom de la base de données où l'utilisateur aura des privilèges (à conserver en anglais).
db.createUser({
  user: '$MONGO_DB_USERNAME',
  pwd:  '$MONGO_DB_PASSWORD',
  roles: [
     # Attribution du rôle 'readWrite' à l'utilisateur, lui permettant de lire et d'écrire dans la base de données spécifiée.
     { role: 'readWrite', db: '$MONGO_DB'}]
})
EOF
