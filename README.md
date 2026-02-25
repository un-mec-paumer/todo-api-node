# Todo API – Node.js / Express

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Tested%20with-Jest-C21325?logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=black)

API REST CRUD de gestion de todos développée en **JavaScript** avec **Node.js** et **Express**.

**API en production :**  
https://todo-api-node-bnce.onrender.com/

---

## Stack Technique

- **Runtime** : Node.js  
- **Framework** : Express  
- **Base de données** : SQLite (sql.js)  
- **Tests** : Jest + Supertest  
- **Linting** : ESLint  
- **CI/CD** : GitHub Actions  
- **Documentation API** : Swagger  
- **Déploiement** : Render  

---

## Installation & Setup

### 1. Cloner le projet

```bash
git clone https://github.com/un-mec-paumer/todo-api-node.git
cd todo-api-node
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur

```bash
npm start
```

Le serveur démarre par défaut sur :

```
http://localhost:3000
```

---

## Scripts disponibles

```bash
npm start        # Lance le serveur
npm test         # Lance les tests avec coverage (Jest)
npm run lint     # Analyse du code avec ESLint
```

---

## Endpoints API

### Health

**GET** `/health`  
→ Vérifie que l’API est opérationnelle.

---

### Todos

**GET** `/todos`  
→ Liste tous les todos  
→ Supporte les query params :  
- `?skip=` (pagination)  
- `?limit=` (nombre d’éléments)

**GET** `/todos/:id`  
→ Récupère un todo par son ID

**GET** `/todos/search?q=`  
→ Recherche des todos via un mot-clé

**POST** `/todos`  
→ Crée un nouveau todo

Body exemple :
```json
{
  "title": "Faire le README",
  "completed": false
}
```

**PUT** `/todos/:id`  
→ Met à jour un todo existant

**DELETE** `/todos/:id`  
→ Supprime un todo

---

## Exemple de requêtes

### ➜ Créer un todo

```bash
curl -X POST https://todo-api-node-bnce.onrender.com/todos \
-H "Content-Type: application/json" \
-d '{
  "title": "Faire le README",
  "completed": false
}'
```

### ➜ Récupérer tous les todos

```bash
curl https://todo-api-node-bnce.onrender.com/todos
```

### ➜ Health Check

```bash
curl https://todo-api-node-bnce.onrender.com/health
```

---

## Documentation API

La documentation interactive est disponible via Swagger.

Une fois le projet lancé en local, elle est accessible à l’adresse suivante :

```
http://localhost:3000/api-docs
```

En production (Render) :

```
https://todo-api-node-bnce.onrender.com/api-docs
```

---

## CI/CD

À chaque push :

- ✅ Lint avec ESLint  
- ✅ Tests avec Jest + coverage  
- ✅ Déploiement automatique sur Render via GitHub Actions  

---

## Déploiement

Application déployée sur :

👉 https://todo-api-node-bnce.onrender.com/

