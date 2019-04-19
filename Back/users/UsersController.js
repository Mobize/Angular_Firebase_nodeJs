
var express = require('express');
var router = express.Router();
var Users = require('./Users');
var admin = require('firebase-admin');
var serviceAccount = require('../cle03-04-bdd-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://authentification-registres.firebaseio.com'
});


router.get('/', function (req, response) {
    Users.getUsers(function(err,rows){
        if(err) {
            response.status(400).json(err);
        }
        else
        {
            // for (var i = 0; i < rows.length; i++) {
            //     var element = rows[i];
            //     console.log(element);
            //     if(i > 1){
            //         return;
            //     }

            admin.auth().createUser({
              //  uid: ''+element.id,
                // email: element.email,
                // email: 'olivier.charpentier@icloud.com',
                email: 'agnesolivier@gmail.com',
                emailVerified: false,
                password: 'Test1234',
                displayName: 'motDePasseOriginal',
                disabled: false
              //  photoURL: '',
              })
                .then(function(userRecord) {
                  // See the UserRecord reference doc for the contents of userRecord.
                  console.log('Successfully created new user:', userRecord.uid);
                })
                .catch(function(error) {
                  console.log('Error creating new user:', error);
                });
              // }
        }
    });
});

  // RECUPERE TOUT LES UTILISATEUR DANS LA CONSOLE
  // Commande pour exporter tout les utilisateur dans un fichier JSON:  firebase auth:export export.json --format=json

// function listAllUsers(nextPageToken) {
//   // List batch of users, 1000 at a time.
//   admin.auth().listUsers(1000, nextPageToken)
//     .then(function(listUsersResult) {
//       listUsersResult.users.forEach(function(userRecord) {
//         // console.log('user', userRecord.toJSON());
//         // SUPPRIME TOUT LES UTILISATEURS
//         admin.auth().deleteUser(userRecord.uid);
//       });
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         listAllUsers(listUsersResult.pageToken);
//       }
//     })
//     .catch(function(error) {
//       console.log('Error listing users:', error);
//     });
// }
// // Start listing users from the beginning, 1000 at a time.
// listAllUsers();

module.exports = router;