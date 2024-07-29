# SECURITY

## Installation de l'application

- `npm i && node app/database/seeding.js`

## OWASP

- [C'est quoi ?](https://owasp.org/)
- [Des docs intéressants ?](https://cheatsheetseries.owasp.org/index.html)
- [Le top 10](https://owasp.org/www-project-top-ten/)

### [Contrôles d'accès défaillants](https://owasp.org/Top10/fr/A01_2021-Broken_Access_Control/)

Il s'agit tout simplement de vérifier que des ressources ne sont pas accessibles sans les permissions qui vont bien. Un utilisateur lambda ne doit par exemple avoir aucun accès aux parties admin.

_Exemple de scénario d'erreur_ : on pense que des pages admin sont privées car elles ne figurent pas dans le menu, pourtant elles sont accessibles par url directe.

_Exemple de solution_ : on ajoute un middleware pour vérifier qu'on est connecté et au besoin vérifier les rôles et les permissions

Allons voir s'il n'y a pas cette erreur dans le projet

### [Défaillances cryptographiques](https://owasp.org/Top10/fr/A02_2021-Cryptographic_Failures/)

Quand des données sensibles comme des mots de passe sont échangées, cela ne doit jamais être lisible. Il y a plusieurs points de vigilence : est-ce que je chiffre mes mots de passe ? est-ce que mon chiffrage est assez robuste ?

_Exemple de scénario d'erreur_ : on utilise un chiffrage trop faible comme [md5](https://md5decrypt.net/) ? ou pire, rien du tout

_Exemple de solution_ : on passe à une solution plus robuste comme bcrypt

Allons voir s'il n'y a pas cette erreur dans le projet

Au passage, on parle d'https sur le site d'owasp ? c'est quoi ça ? Quelques liens utiles : [bd explicative](https://howhttps.works/), [outil pratique](https://certbot.eff.org/)

### [Injection](https://owasp.org/Top10/fr/A03_2021-Injection/)

Il peut s'agir de différentes injections. La solution : NTUI

- Injection SQL : Il faut vérifier ce qu'on insère dans la bdd, on n'avait pas déjà parlé de requêtes préparées, et si on se faisait un petit flashback ?
- Faille XSS : en plus il faut aussi vérifier ce qu'on insère dans HTML, il faut faire attention à ne pas interpréter des scripts involontairement

### [Mauvaise configuration de sécurité](https://owasp.org/Top10/fr/A05_2021-Security_Misconfiguration/)

_Exemple de scénario d'erreur_ : on garde des informations de connexion par défaut

_Exemple de solution_ : on met des informations différentes et complexes pour chaque projet

On connait le chemin, on va vérifier ça

### [Composants vulnérables et obsolètes](https://owasp.org/Top10/fr/A06_2021-Vulnerable_and_Outdated_Components/)

Tout est dans le titre. On utilise plein de package npm souvent mis à jour. Ces mises à jour ne se font pas sans raisons, il peut y avoir des corrections de failles identifiées. Un exemple pour [sequelize](https://security.snyk.io/vuln/SNYK-JS-SEQUELIZE-450222)

Quelques commandes utiles :

- `npm update PACKAGE`
- `npm audit`

Si on regarde notre projet on peut se sentir concerné par ce genre de soucis, et vérifier les infos sur les dépots de nos dépendances, [un exemple au hasard](https://github.com/sequelize/sequelize/issues/11400 )

### +

Si t'en veux encore voilà un peu de lecture sur les [CSRF](https://kourou.oclock.io/ressources/fiche-recap/cross-site-request-forgery-csrf/)
