# Back-end Hub'y
&nbsp;

<p align="center">
  <img src="https://github.com/Huby-sm/front/blob/develop/src/images/logo.png?raw=true)https://github.com/Huby-sm/front/blob/develop/src/images/logo.png" alt="Logo Hub'y" width="400">
</p>

## Description

Hub'y est un réseau social innovant dédié à l'épanouissement des étudiants et au renforcement du sentiment d'appartenance au sein de leur école de formation supérieure.

Il a été conçu en partenariat avec Ynov, un acteur majeur de la formation aux métiers du numérique, qui a à cœur de veiller au bien-être de ses étudiants. En réponse à la croissance continue de l'école et à l'arrivée de nouveaux étudiants, nous avons imaginé une solution moderne et conviviale pour faciliter les interactions et les échanges entre les étudiants, l'administration et le BDE.

Ce répertoirecontient la partie backend de Hub'y qui joue un rôle central dans l'application en agissant comme le moteur qui gère les fonctionnalités, les données et les interactions. Il assure la gestion des utilisateurs, des posts, des commentaires et de toutes les opérations essentielles à la fluidité de l'expérience sur la plateforme Hub'y.

## Règles pour le Développement sur Git

Le projet Hub'y suit une méthodologie de gestion de versions basée sur le workflow "git-flow". Cette approche organise la collaboration et le développement de manière structurée, garantissant la stabilité et la cohérence du code à chaque étape du processus. Voici les principales règles à suivre lors du développement sur le référentiel Git :

1. **Branche Master (Production) :** La branche master représente la version de production stable du projet. Elle est mise à jour uniquement avec des fonctionnalités testées et approuvées. Il est primordial que le code fusionné dans la branche master soit exempt d'erreurs majeures.

2. **Branche Develop :** La branche develop est le cœur du développement continu. Elle regroupe toutes les nouvelles fonctionnalités en cours de développement. Les contributions individuelles sont intégrées à cette branche via des pulls requests.

3. **Branches de Feature :** Chaque nouvelle fonctionnalité est développée dans une branche de feature distincte, portant le nom du ticket correspondant dans le tableau Kanban. Par exemple, si vous travaillez sur le ticket "Feature #123", votre branche sera nommée "123-feature". Les branches de feature sont créées à partir de la branche develop.

4. **Pull Requests (Demandes de Fusion) :** Avant de fusionner une branche de feature dans la branche develop, un pull request doit être créé. Les pull requests sont examinés par les responsables du référentiel Git, qui évaluent la qualité du code, la cohérence et l'adéquation avec les exigences du projet.

5. **Validation des Pull Requests :** Les responsables du référentiel Git sont responsables de la validation des pull requests. Avant la fusion, le code est examiné attentivement pour garantir la qualité, la sécurité et la conformité aux normes de développement.

6. **Mise à Jour Fréquente :** Pour maintenir une cohérence dans le développement, il est recommandé de synchroniser régulièrement votre branche de feature avec la branche develop. Cela réduit les conflits de fusion et facilite l'intégration finale.

En suivant ces règles, vous contribuerez à un développement fluide et sécurisé au sein du projet Hub'y. La méthodologie "git-flow" assure une gestion efficace des versions, facilite la collaboration et garantit que chaque fonctionnalité ajoutée est soigneusement testée avant d'être intégrée à la version de production.

## Prérequis pour l'Installation

Avant de commencer à travailler sur le projet Hub'y, assurez-vous d'avoir les éléments suivants en place :

1. **Node.js :** Assurez-vous d'avoir Node.js installé sur votre système. Vous pouvez le télécharger et l'installer à partir du site officiel : [Node.js](https://nodejs.org/)

2. **npm :** npm est le gestionnaire de paquets de Node.js. Il est généralement installé automatiquement avec Node.js. Vérifiez si npm est installé en ouvrant votre terminal et en tapant la commande suivante :
` npm -v `. Si la commande ne renvoie pas d'erreur et affiche la version de npm, vous êtes prêt.

3. **Git :** Si vous n'avez pas encore Git installé sur votre système, vous pouvez le télécharger et l'installer à partir de : [Git Downloads](https://git-scm.com/downloads)

4. **Éditeur de Code :** Vous pouvez utiliser l'éditeur de code de votre choix. Visual Studio Code ou WebStorm est recommandé pour ce projet en raison de leur grande intégration avec Node.js et Git : [VS Code](https://code.visualstudio.com/) ou [WebStorm](https://www.jetbrains.com/fr-fr/webstorm/)

5. **Navigateur Web :** Le projet Hub'y utilise des technologies web. Pour les tests et le développement, assurez-vous d'avoir un navigateur web moderne comme Google Chrome ou Mozilla Firefox installé.

6. **Compte GitHub :** Vous aurez besoin d'un compte GitHub avec les permissions appropriées pour cloner le référentiel, travailler sur les branches et soumettre des pull requests.

7. **Postman (Facultatif) :** Pour faciliter le test des API, vous pouvez utiliser Postman, un outil pratique pour envoyer des requêtes HTTP et vérifier les réponses. Vous pouvez le télécharger ici : [Postman](https://www.postman.com/downloads/).

Une fois que vous avez tous les prérequis en place, vous êtes prêt à l'installation du projet pour pouvoir commencer à travailler dessus.

## Installation et Exécution du projet

Pour installer et exécuter la partie back-end du projet Hub'y, suivez ces étapes pour vous assurer que tout est configuré correctement et fonctionne sans accroc.

1. **Clonage du Référentiel :** Commencez par cloner le référentiel du projet Hub'y en utilisant la commande suivante dans votre terminal :

    ``` git clone https://github.com/Huby-sm/back.git ```

2. **Accès au Répertoire :** Naviguez vers le répertoire que vous venez de cloner en entrant la commande : :

    ``` cd back ```

3. **Configuration du fichier .env :** Avant de démarrer, assurez-vous d'avoir créé un fichier `.env` à la racine du répertoire du projet. Pour vous aider, un fichier `.env.example` est fourni dans lequel vous trouverez les noms des variables d'environnement nécessaires. Copiez ce fichier en le renommant `.env`, puis ajoutez les valeurs spécifiées pour les différentes variables.

4. **Installation des Dépendances :** Assurez-vous d'avoir Node.js et npm installés. Ensuite, installez les dépendances du projet avec cette commande :

    ``` npm install ```

5. **Démarrage du Serveur de Développement :** Démarrez le serveur en exécutant la commande :

    ``` nodemon index.js```

6. **Accès à l'API :** Votre serveur back-end sera en cours d'exécution à l'adresse `http://localhost:3001`. Vous pouvez accéder aux différentes routes de l'API à partir de cette URL.

Le back-end du projet Hub'y est construit avec Express et utilise une base de données MongoDB. Pour assurer le bon fonctionnement, veillez à suivre ces étapes attentivement. 

Une fois le back-end en cours d'exécution, il interagira avec la partie front-end pour fournir une expérience utilisateur fluide et cohérente.


## Mise en production
