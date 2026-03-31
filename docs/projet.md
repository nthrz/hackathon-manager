\# Présentation du projet



\## Titre provisoire

Plateforme web collaborative de gestion de hackathons à distance



\## Contexte



Ce projet consiste à développer une application web collaborative permettant d’organiser et de suivre le déroulement d’un hackathon à distance.



L’objectif est de proposer une plateforme sur laquelle plusieurs utilisateurs peuvent participer à un événement de type hackathon, former des équipes, répartir le travail, suivre les tâches et structurer la collaboration dans un cadre clair.



Ce projet s’inscrit dans un cadre universitaire. Il doit donc être à la fois réaliste, cohérent techniquement, faisable à l’échelle d’un projet étudiant, et suffisamment riche pour démontrer des compétences en développement web, API REST, base de données relationnelle et logique métier.



\## Idée générale



Un hackathon est considéré comme un événement global pouvant regrouper plusieurs équipes.



Chaque équipe appartient à un hackathon donné et possède sa propre organisation interne :

\- membres

\- rôles

\- tâches

\- suivi d’avancement



Le projet distingue donc deux niveaux de gestion :



\### Administration globale du hackathon

Assurée par l’organisateur du hackathon, qui peut :

\- créer et configurer un hackathon

\- gérer ses paramètres

\- superviser les équipes inscrites

\- consulter les participants



\### Administration locale de l’équipe

Assurée par le créateur de l’équipe ou chef d’équipe, qui peut :

\- gérer les membres de l’équipe

\- attribuer ou modifier les rôles internes

\- créer et répartir les tâches

\- suivre l’avancement du travail



Cette séparation entre niveau global et niveau local constitue une logique centrale du projet.



\## Objectifs fonctionnels



L’application doit permettre à un utilisateur de :

\- créer un compte

\- se connecter

\- consulter les hackathons existants

\- créer ou rejoindre un hackathon

\- créer une équipe dans un hackathon

\- rejoindre une équipe existante

\- voir les membres de son équipe

\- créer et consulter des tâches

\- suivre l’état d’avancement du projet



\## Intérêt académique



Ce projet permet de mettre en œuvre plusieurs notions importantes :

\- conception d’une base de données relationnelle

\- mise en place d’un CRUD complet

\- gestion des rôles et permissions

\- séparation front-end / back-end / base de données

\- conception d’une API REST

\- modélisation d’entités liées entre elles

\- structuration d’une logique métier réaliste



\## Choix techniques généraux



Le projet sera développé sous forme d’application web.



\### Front-end

Le front-end utilisera uniquement :

\- HTML

\- CSS

\- JavaScript vanilla



Aucun framework front-end de type React ou Vue.js ne sera utilisé.



\### Back-end

Le back-end exposera une API REST et contiendra la logique métier de l’application.



\### Base de données

Le projet reposera sur une base de données relationnelle, adaptée aux nombreuses relations entre utilisateurs, hackathons, équipes, membres et tâches.



\## Philosophie du projet



Le projet doit rester :

\- sobre

\- moderne

\- intuitif

\- maintenable

\- réaliste pour un étudiant



Il ne s’agit pas de construire une plateforme surdimensionnée, mais une application cohérente, bien structurée et évolutive.



\## Bonus envisagés



Si le temps le permet, des fonctionnalités complémentaires pourront être ajoutées :

\- messagerie interne entre membres d’une équipe

\- réactions aux messages

\- commentaires sur les tâches

\- historique d’activité

\- ressources partagées de projet

