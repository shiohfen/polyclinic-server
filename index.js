const express = require('express')
const cors = require('cors');

const app = express();
const admin = require('firebase-admin');
const port = 3000;

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Where we will keep books
let books = [];

app.use(cors());

app.get('/registerUser', (req, res) => {
  admin.auth().createUser({
    email: req.email,
    emailVerified: false,
    phoneNumber: req.contact,
    password: req.password,
    displayName: req.firstName + ' ' + req.lastName,
    photoURL: req.photoURL,
    disabled: false,
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
});

app.get('/disableUser', (req, res) => {
  admin.auth().updateUser(req.uid, {
    disabled: true,
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', req.uid);
    })
    .catch((error) => {
      conle.log('Error creating new user:', error);
    });
});

app.get('/enableUser', (req, res) => {
  admin.auth().updateUser(req.uid, {
    disabled: false,
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', req.uid);
    })
    .catch((error) => {
      conle.log('Error creating new user:', error);
    });
});

app.get('/deleteUser', (req, res) => {
  admin.auth()
    .deleteUser(req.uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
