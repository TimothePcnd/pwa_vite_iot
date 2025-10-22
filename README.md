# SensorTech PWA

L'application **SensorTech** est une **Progressive Web App (PWA)** dédiée à la gestion et à l'affichage des données des capteurs IoT. Elle se connecte à une **API REST** pour récupérer des informations en temps réel, telles que la température, l'humidité et d'autres métriques provenant de capteurs IoT. Cette application est **responsive**, fonctionne en **mode hors-ligne**, et peut être installée sur les appareils mobiles. Développée avec **ReactJS** et **Vite**, elle offre une expérience fluide et rapide, tout en intégrant des fonctionnalités comme la gestion des **notifications push** et le **mode sombre**.

## Objectifs du projet

- Développer une interface **dynamique** et **réactive** pour consulter les données provenant de l'API **SensorTech**, avec des mises à jour en temps réel.
- Implémenter les fonctionnalités d'une **Progressive Web App (PWA)** : Service Worker, mise en cache, manifest pour garantir une expérience fluide et rapide même sans connexion Internet.
- Assurer que l'application est **installable sur mobile** via la gestion du manifeste et du service worker.
- Permettre l'utilisation de l'application en **mode hors-ligne**, grâce à l'intégration de la mise en cache via **Workbox**.
- Déployer l'application en ligne sur une plateforme telle que **Plesk** pour la rendre accessible à tous les utilisateurs.

## Technologies utilisées

- **ReactJS** : Bibliothèque JavaScript utilisée pour construire l'interface utilisateur. Elle permet de créer des interfaces dynamiques et réactives avec une gestion optimisée des composants.
- **Vite** : Bundler rapide et léger pour les projets front-end, utilisé ici pour ses performances et sa configuration simplifiée.
- **Service Worker** : Utilisé pour permettre le fonctionnement hors-ligne en stockant les ressources dans le cache, rendant l'application disponible même sans connexion Internet.
- **Workbox** : Utilisé pour faciliter la gestion des caches et des service workers, notamment pour la mise en cache des ressources statiques et des API.
- **React Router** : Utilisé pour gérer la navigation entre les différentes pages de l'application sans rechargement complet de la page.
- **Axios** : Utilisé pour effectuer des requêtes HTTP vers l'API REST, permettant de récupérer les données des capteurs.
- **PWA (Progressive Web App)** : Mise en œuvre du manifest, service worker, gestion du cache, et notifications push pour améliorer l'expérience utilisateur sur mobile.

## Fonctionnalités

- **Responsive** : L'application s'adapte automatiquement à toutes les tailles d'écran, que ce soit sur un téléphone, une tablette ou un bureau. L'interface est optimisée pour chaque type de dispositif grâce à des requêtes CSS et un design fluide.

- **Offline-Ready** : L'application utilise un **service worker** pour mettre en cache les ressources essentielles (comme les pages HTML, les fichiers CSS, et les images) et permet de continuer à consulter les données même sans connexion. Les données sont récupérées dès que la connexion est disponible.

- **Notifications Push** : Les utilisateurs peuvent recevoir des notifications push lorsque de nouvelles données arrivent ou lorsque l'état d'un capteur change (par exemple, si la température dépasse un seuil prédéfini). Ces notifications sont gérées via le service worker et l'API de notifications du navigateur.

- **API intégrée** : L'application récupère les données des capteurs en temps réel via l'API REST de **SensorTech**. Ces données sont ensuite affichées dynamiquement sur l'interface à l'aide de ReactJS et d'**Axios** pour les requêtes HTTP.

## Installation et exécution

### Prérequis

- **Node.js** et **npm** doivent être installés sur votre machine. Si vous ne les avez pas, vous pouvez les télécharger [ici](https://nodejs.org/).

