const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require('cors')

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(cors({ origin: ['http://localhost:5000', 'https://fir-demo-44618.firebaseapp.com'] }));

// Get all users
app.get("/", async (request, response) => {
  const userCollectionRef = db.collection("users");
  const result = await userCollectionRef.get();

  let users = [];
  result.forEach((userDoc) => {
    const id = userDoc.id;
    const data = userDoc.data();
    users.push({ id, ...data });
  });

  response.status(200).send(users);
});

exports.users = functions.https.onRequest(app);
