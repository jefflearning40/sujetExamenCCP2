
# Manager Task register

se connecter a MTR et choisir entre benevole et association
 *Le benevole peut se connecter ou s'inscrire

 si il s'inscrit, il doit attendre que son inscription soit validée par l'admin de l'association

 si il se connect, il pourra avoir la liste des missions disponibles

*l'admin d'une association doit se connecter avec son mot de passe admin
si la distribution des roles le reconnait comme admin alors il peut lire les demande d'inscriptions
ou alors gerer le CRUD

pour commencer, aller sur MTR.html.
1 choisir benevole ou association

utilisation de faker pour généerer un jeux de données pour la table mission de la base de données mtr.

LEs ENDPOINTS points d'acces pour le client
----------------------------------------------

dans thunder-client: la route   missions/post
                                missions/get et /id
                                missions/delete et delete/id
                                missions/patch
                                mission/put

/user/get → récupère tous les utilisateurs

/user/:id → récupère un utilisateur précis

/user/post → crée un nouvel utilisateur (mot de passe haché)

/user/:id (PUT) → met à jour un utilisateur

/user/:id (DELETE) → supprime un utilisateur
