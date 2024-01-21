# Image NGINX - Load Balancer

## Dockerfile NGINX

```dockerfile
# Utiliser l'image standard de Nginx depuis Docker Hub
FROM nginx
# Copier le fichier de configuration depuis le répertoire courant et le coller
# à l'intérieur du conteneur pour l'utiliser comme configuration par défaut de Nginx.
COPY nginx.conf /etc/nginx/nginx.conf
# Exposer le port 8000 du conteneur qui sera ensuite mappé au port
# 8000 de notre machine hôte via Compose. Ainsi, nous pourrons accéder au serveur via localhost:8000 sur notre hôte.
EXPOSE 8000

# Démarrer Nginx lorsque le conteneur est prêt.
CMD ["nginx", "-g", "daemon off;"]
```

### Configuration NGINX

```conf
events {
    worker_connections 1024;  # Nombre de connexions simultanées que Nginx peut gérer (1024 ici).
}
http {
  upstream frontend {
    # Ce sont des références à nos conteneurs backend, facilitées par
    # Compose, comme défini dans docker-compose.yml
    server angular:4000;
  } 
  upstream backend {
    # Ce sont des références à nos conteneurs backend, facilitées par
    # Compose, comme défini dans docker-compose.yml
    server express:3000;
  }

  server {
      listen 8000; # NGINX écoutera sur le port 8000
      server_name frontend; # Définir le nom du serveur pour le frontend
      server_name backend; # Définir le nom du serveur pour le backend

      location / {
         proxy_pass http://frontend; # Rediriger les requêtes vers le frontend
         proxy_set_header Host $host; # Définir l'en-tête Host pour les requêtes
      }
      location /api {
         proxy_pass http://backend; # Rediriger les requêtes /api vers le backend
         proxy_set_header Host $host; # Définir l'en-tête Host pour les requêtes
      }
    }
}
```
