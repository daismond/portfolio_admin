# --- STAGE 1: Build frontend React ---
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install
COPY frontend/ ./
RUN pnpm run build --host

# --- STAGE 2: Setup backend Flask ---
FROM python:3.11-slim

# Variables d'environnement pour Flask
ENV FLASK_APP=src/main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN python -m venv venv
RUN ./venv/bin/pip install --upgrade pip
RUN ./venv/bin/pip install -r requirements.txt

# Copier le code backend
COPY backend/src ./src

# Copier le build frontend dans le backend (pour servir les fichiers statiques)
COPY --from=frontend-builder /app/frontend/dist ./src/static

EXPOSE 5000

# Commande de démarrage
CMD ["./venv/bin/python", "src/main.py"]
