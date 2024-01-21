### ÉTAPE 1 : Construction ###

# [INSTRUCTION 1]
# Utilisez l'image officielle de Node version 19 avec l'étiquette 'bullseye'
FROM [Votre Réponse Ici] as builder

# [INSTRUCTION 2]
# Copiez les fichiers package.json et package-lock.json de votre frontend dans le conteneur
# Utilisez la commande COPY
COPY [Votre Réponse Ici]

# [INSTRUCTION 3]
# Installez les dépendances, en prenant en compte les anciennes dépendances (legacy peer dependencies)
# Utilisez la commande RUN avec npm
RUN [Votre Réponse Ici]

# [INSTRUCTION 4]
# Définissez le répertoire de travail dans le conteneur pour /app
WORKDIR [Votre Réponse Ici]

# [INSTRUCTION 5]
# Copiez l'ensemble du code frontend dans le conteneur
COPY [Votre Réponse Ici]

# [INSTRUCTION 6]
# Construisez l'application Angular en mode production
# Utilisez la commande RUN avec npm
RUN [Votre Réponse Ici]

### ÉTAPE 2 : Configuration ###

# [INSTRUCTION 7]
# Utilisez une image Node plus légère, version 16 avec Alpine
FROM [Votre Réponse Ici]

# [INSTRUCTION 8]
# Copiez le code backend dans le conteneur
COPY [Votre Réponse Ici]

# [INSTRUCTION 9]
# Installez les dépendances du backend
RUN [Votre Réponse Ici]

# [INSTRUCTION 10]
# Copiez les fichiers Angular compilés depuis l'étape 'builder'
COPY --from=builder [Votre Réponse Ici]

# [INSTRUCTION 11]
# Exposez le port utilisé par votre application Express
EXPOSE [Votre Réponse Ici]

# [INSTRUCTION 12]
# Définissez la commande pour démarrer l'application
CMD [Votre Réponse Ici]
