const express = require('express')
const cors = require('cors');

const app = express();
const admin = require('firebase-admin');
const port = 3000;

var serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": JSON.parse(process.env.private_key),
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url,
}



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());

app.post('/registerUser', (req, res) => {
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

app.post('/disableUser', (req, res) => {
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

app.post('/enableUser', (req, res) => {
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

app.post('/deleteUser', (req, res) => {
  admin.auth()
    .deleteUser(req.uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
});

app.get('/', (req, res) => {
      console.log('Hello');
});

app.listen(port, () => console.log(`listening on port ${port}!`));
