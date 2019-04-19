
const admin = require('firebase-admin');
var serviceAccount = require('./cle03-04-bdd-firebase.json');
const functions = require('firebase-functions');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://authentification-registres.firebaseio.com'
});

const db = admin.firestore();

admin.auth().createUser({
    //  uid: ''+element.id,
      // email: element.email,
      email: 'olivier.charpentier@icloud.com',
      // email: 'agnesolivier@gmail.com',
      emailVerified: false,
      password: 'Test1234',
      displayName: 'Olivier Charpentier',
      disabled: false,
      photoURL: 'http://oliviercharpentier.fr/img/Oliv.png',
    })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        return db
    .collection('Users')
    .doc(userRecord.uid)
    .set({
      email: userRecord.email,
      displayName: userRecord.displayName,
      isPasswordChanged: false,  
      isAdmin: true,
    })
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch(function(error) {
        console.log('Error creating new user:', error);
      });

