const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Replace with your Firebase Admin SDK JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
