########### BASE IMAGE ###########
# 1. Utilisation d'une image légère de Node.js
FROM node:24-slim AS base

# 2. Définir le dossier de travail
WORKDIR /app

# 3. Copier les fichiers package.json et package-lock.json pour optimiser le cache
COPY package*.json ./

# 4. Installer les dépendances (inclus Puppeteer)
RUN npm install --ignore-scripts

COPY . .

# 5. Exposer le port (optionnel, si ton bot a un serveur HTTP)
EXPOSE 3000

# 6. Commande pour démarrer l'application
CMD ["npm", "start"]

