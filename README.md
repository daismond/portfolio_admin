# Portfolio Développeur Mobile avec Administration

Ce dépôt contient le code source d'un portfolio de développeur mobile moderne et professionnel, incluant une interface d'administration pour gérer les données. Le projet est divisé en deux parties principales : un frontend développé avec React et un backend développé avec Flask.

## 🚀 Lancer le Projet Localement

Suivez ces instructions pour configurer et exécuter le projet sur votre machine locale.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre système :

- **Node.js** (version 18 ou supérieure) et **pnpm** (gestionnaire de paquets recommandé pour le frontend)
- **Python** (version 3.9 ou supérieure) et **pip** (gestionnaire de paquets pour le backend)
- **Git** (pour cloner le dépôt)

### 📦 Installation

1.  **Cloner le dépôt :**

    ```bash
    git clone https://github.com/daismond/portfolio_admin.git
    cd portfolio_admin
    ```

2.  **Installation du Backend (Flask) :**

    Naviguez vers le répertoire `backend` et installez les dépendances Python. Il est recommandé d'utiliser un environnement virtuel.

    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # Sur Windows, utilisez `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

    Si le fichier `requirements.txt` n'existe pas, vous pouvez le générer après avoir installé les dépendances manuellement :

    ```bash
    pip install Flask Flask-CORS Flask-SQLAlchemy Flask-JWT-Extended passlib
    pip freeze > requirements.txt
    ```

3.  **Installation du Frontend (React) :**

    Naviguez vers le répertoire `frontend` et installez les dépendances JavaScript avec pnpm.

    ```bash
    cd ../frontend
    pnpm install
    ```

### ⚙️ Configuration et Initialisation (backend)

Suivez ces étapes dans l'ordre pour configurer et initialiser votre backend.

#### Étape 1 : Créer le fichier d'environnement

Créez un fichier nommé `.env` à la racine du dossier `backend`. Vous pouvez copier le fichier `backend/.env.example` pour démarrer.

#### Étape 2 : Configurer les variables

Ouvrez votre nouveau fichier `backend/.env` et remplissez les variables nécessaires :

-   `DATABASE_URL`: **(Obligatoire)** L'URL complète de connexion à votre base de données PostgreSQL (Supabase).
-   `FRONTEND_ORIGINS`: **(Obligatoire pour la production)** Une liste d'URL de vos frontends autorisés à contacter ce backend, séparées par des virgules. Par exemple : `https://mon-portfolio.com,https://mon-admin.com`. Pour le développement local, vous n'avez pas besoin de définir cette variable.
-   `MAIL_SERVER`, `MAIL_PORT`, etc. : **(Optionnel)** Remplissez ces variables si vous souhaitez que le formulaire de contact envoie des e-mails.

**Note :** Si ce fichier ou cette variable n'existent pas, l'application utilisera une base de données de test locale (SQLite), ce qui est pratique pour le développement.

#### Étape 2 : Initialiser la base de données

Cette étape est **cruciale** pour une nouvelle base de données. Elle va créer toutes les tables et y insérer les données de base (comme votre compte `admin`).

**Attention :** N'exécutez cette commande qu'une seule fois sur une base de données vide.

Depuis le dossier `backend` (avec votre environnement virtuel activé), lancez :
```bash
python -m src.seed_data
```
Le script va se connecter à l'URL que vous avez définie à l'étape 1 et peupler la base de données. Vous pourrez ensuite vous connecter avec `admin` et `admin123`.

#### Étape 3 : Configurer les E-mails (Optionnel)

Pour que l'envoi d'e-mails depuis le formulaire de contact fonctionne, ajoutez ces variables à votre fichier `.env` :

#### Configuration E-mail

Pour que l'envoi d'e-mails depuis le formulaire de contact fonctionne, configurez également ces variables :

-   `MAIL_SERVER`: Le serveur SMTP pour l'envoi d'e-mails (ex: `smtp.gmail.com`).
-   `MAIL_PORT`: Le port du serveur SMTP (ex: `587`).
-   `MAIL_USE_TLS`: Mettre à `true` si votre serveur utilise TLS.
-   `MAIL_USERNAME`: Votre adresse e-mail pour l'authentification.
-   `MAIL_PASSWORD`: Le mot de passe de votre compte e-mail (ou un mot de passe d'application).
-   `MAIL_DEFAULT_SENDER`: L'adresse e-mail qui apparaîtra comme expéditeur.

**Exemple de configuration pour Gmail :**
```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=votre.email@gmail.com
MAIL_PASSWORD=votremotdepassedapplication
MAIL_DEFAULT_SENDER=votre.email@gmail.com
```

### ▶️ Exécution du Projet

Pour lancer le portfolio et son interface d'administration, vous devez démarrer le backend et le frontend séparément.

1.  **Démarrer le Backend (Flask) :**

    Assurez-vous d'être dans le répertoire `backend` et que votre environnement virtuel est activé.

    ```bash
    cd backend
    source venv/bin/activate
    python src/main.py
    ```

    Le backend devrait démarrer sur `http://127.0.0.1:5000`.

2.  **Démarrer le Frontend (React) :**

    Assurez-vous d'être dans le répertoire `frontend`.

    ```bash
    cd ../frontend
    pnpm run dev --host
    ```

    Le frontend devrait démarrer sur `http://localhost:5173`.

### 🌐 Accès au Portfolio et à l'Administration

Une fois les deux serveurs lancés :

-   **Portfolio Public :** Ouvrez votre navigateur et allez à `http://localhost:5173`
-   **Interface d'Administration :** Ouvrez votre navigateur et allez à `http://localhost:5173/admin`

    **Identifiants de connexion pour l'administration :**
    -   **Nom d'utilisateur :** `admin`
    -   **Mot de passe :** `admin123`

### ⚠️ Important : Configuration CORS

Le frontend et le backend communiquent entre eux. Pour que cela fonctionne correctement en développement local, la configuration CORS (Cross-Origin Resource Sharing) est essentielle. Le backend Flask est configuré pour accepter les requêtes provenant de l'origine du frontend. Si vous modifiez les ports ou les domaines, assurez-vous de mettre à jour la configuration CORS dans `backend/src/main.py`.

En production, les URLs seront celles du déploiement, comme indiqué dans le guide d'administration fourni séparément.

## 📂 Structure du Projet

```
portfolio_admin/
├── backend/                # Code source du backend Flask
│   ├── venv/               # Environnement virtuel Python
│   ├── src/                # Code source de l'application Flask
│   │   ├── main.py         # Point d'entrée de l'application Flask
│   │   ├── models/         # Modèles de base de données
│   │   ├── routes/         # Définition des routes API
│   │   └── static/         # Fichiers statiques (frontend build)
│   ├── requirements.txt    # Dépendances Python
│   └── ...
├── frontend/               # Code source du frontend React
│   ├── public/             # Fichiers statiques publics
│   ├── src/                # Code source de l'application React
│   │   ├── components/     # Composants React
│   │   ├── App.jsx         # Composant principal de l'application
│   │   ├── App.css         # Styles globaux
│   │   └── ...
│   ├── package.json        # Dépendances Node.js et scripts
│   ├── pnpm-lock.yaml      # Fichier de verrouillage pnpm
│   └── ...
└── README.md               # Ce fichier
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des issues ou à soumettre des pull requests.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. (Note: Le fichier LICENSE n'est pas inclus dans ce dépôt, mais il est recommandé d'en ajouter un.)

---

**Développé par Manus AI**

