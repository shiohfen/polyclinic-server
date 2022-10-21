const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.use(cors({ origin: true }));
app.options("*", cors())


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

app.post('/registerUser', (req, res) => {

  admin.auth().createUser({
    email: req.body.email,
    emailVerified: false,
    password: req.body.password,
    displayName: req.body.firstName + ' ' + req.body.lastName,
    photoURL: req.body.photoURL,
    disabled: false,
  })
    .then(async (userRecord) => {
      console.log('Successfully created new user:', userRecord.uid);
      res.json({"uid": userRecord.uid})
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      res.send();

    });
});

app.post('/disableUser', (req, res) => {
  admin.auth().updateUser(req.body.uid, {
    disabled: true,
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.uid);
      res.send();

    })
    .catch((error) => {

      conle.log('Error creating new user:', error);
      res.send();

    });
});

app.post('/enableUser', (req, res) => {
  admin.auth().updateUser(req.body.uid, {
    disabled: false,
  })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.uid);
      res.send();

    })
    .catch((error) => {
      conle.log('Error creating new user:', error);
      res.send();

    });
});

app.post('/deleteUser', (req, res) => {
  admin.auth()
    .deleteUser(req.body.uid)
    .then(() => {
      console.log('Successfully deleted user');
      res.send();

    })
    .catch((error) => {
      console.log('Error deleting user:', error);
      res.send();

    });
});

app.post('/updateEmail', (req, res) => {
  admin.auth()
    .updateUser(req.body.uid, {
      email: req.body.email,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully updated user', userRecord.toJSON());
      res.send();
    })
    .catch((error) => {
      console.log('Error updating user:', error);
      res.send();
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
