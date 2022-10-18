const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const admin = require('firebase-admin');
const firebase = require('firebase/compat/app');

const { private_key } = JSON.parse(process.env.private_key)

var serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": private_key,
  "client_email": process.env.client_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url,
}

// const sa = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.json())

app.post('/registerUser', (req, res) => {

  admin.auth().createUser({
    email: req.body.email,
    emailVerified: false,
    phoneNumber: req.body.contact,
    password: req.body.password,
    displayName: req.body.firstName + ' ' + req.lastName,
    photoURL: req.body.photoURL,
    disabled: false,
  })
    .then(async (userRecord) => {
      // console.log('Successfully created new user:', userRecord.uid);
      res.send('Successfully Created User!')
      // admin.auth().generateEmailVerificationLink(userRecord.email,)
      //   .then((link) => {
      //     // Construct email verification template, embed the link and send
      //     res.send('Email Verification Sent!'+ link)
      //   })
      //   .catch((error) => {
      //     // Some error occurred.
      //     console.log('Error sending Email Verification!:', error);
      //   });
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
});

app.post('/disableUser', (req, res) => {
  admin.auth().updateUser(req.body.uid, {
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
  admin.auth().updateUser(req.body.uid, {
    disabled: false,
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', req.body.uid);
    })
    .catch((error) => {
      conle.log('Error creating new user:', error);
    });
});

app.post('/deleteUser', (req, res) => {
  admin.auth()
    .deleteUser(req.body.uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
});

app.get('/', (req, res) => {
  res.send('please work');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port: ' + process.env.PORT || 5000);
})

// app.listen(5000, () => {
//   console.log('Listening on port: ' + 5000);
// })
