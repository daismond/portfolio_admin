# Étape 1 : builder
FROM node:lts-alpine AS builder

# Créer le dossier de l'app dans le container
WORKDIR /app

# Copier les fichiers de configuration npm
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier tout le reste des fichiers
COPY . .

# Construire le projet si besoin (ex: TypeScript)
# RUN npm run build  # Décommente si tu as un build step

# Étape 2 : image finale
FROM node:lts-alpine

WORKDIR /app

# Copier les dépendances depuis le builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Exposer le port sur lequel ton serveur écoute
EXPOSE 3000

# Commande pour démarrer ton serveur
CMD ["node", "server.js"]
# Si ton point d'entrée est différent (ex: index.js), adapte-le ici
