# Backend Groupomania

### Prérequis
Vous aurez besoin d'avoir `Node.js` et `NPM` installés en local sur votre machine.

### Installation
Clôner ce dépôt. 

Créer une base de données sur MySQL. Pour l'utiliser, créer un fichier .env en suivant le modèle fourni dans le fichier .env.dist et ajouter les variables d'environnement.

À partir du dossier du projet, exécuter :
```
npm install
``` 
Si l'installation de l'ORM Sequelize échoue à l'exécution, le lancer séparement avec la commande :
```
npm install sequelize
``` 
Vous pouvez ensuite lancer le serveur avec la commande :
```
node server
``` 
Le serveur devrait fonctionner en localhost avec le port 3000 par défaut. 
