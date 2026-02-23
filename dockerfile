########### BASE IMAGE ###########
# 1. Utilisation d'une image légère de Node.js
FROM node:24-slim AS base

# 2. Définir le dossier de travail
WORKDIR /app

# 3. Copier les fichiers package.json et package-lock.json pour optimiser le cache
COPY *.json ./

# 4. Installer les dépendances (inclus Puppeteer)
RUN npm install

############ DEVELOPMENT IMAGE ###########
FROM base AS dev

# 9. Exposer le port (optionnel, si ton bot a un serveur HTTP)
EXPOSE 3000

# 10. Commande pour démarrer l'application
CMD ["npm", "run", "start"]

