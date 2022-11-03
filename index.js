const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
// const client = require('twilio')('ACda737055fd889684f26ca50f0a91703b', '8ecdb3e3b53c7a692e9d21a04e4b7179',);
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
      res.send(userRecord.uid)
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
  // try {
  //   // client.verify.v2.services('ACda737055fd889684f26ca50f0a91703b')
  //   //   .verifications
  //   //   .create({ to: '+63948750373', channel: 'sms' })
  //   //   .then(verification => console.log(verification.status));
  //   client.messages
  //     .create({
  //       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  //       from: '+18316180662',
  //       to: '+63948750373'
  //     })
  //     .then(message => console.log(message.sid));
  // } catch (error) {
  //   res.send(error)
  // }
  res.send('please work');
});

// app.post('/verifyPhone', (req, res) => {
//   try {
//     client.verify.v2.services('ACda737055fd889684f26ca50f0a91703b')
//       .verifications
//       .create({ to: '+63948750373', channel: 'sms' })
//       .then(verification => console.log(verification.status));
//   } catch (error) {
//     res.send(error)
//   }

// })

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port: ' + process.env.PORT || 5000);
})

// app.listen(5000, () => {
//   console.log('Listening on port: ' + 5000);
// })
