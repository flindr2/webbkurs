const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors")

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(cors({ origin: ['http://localhost:5000'] }));
app.use(bodyParser.json());


// GET a single user
app.get("/:id", async (request, response) => {
  try {
    const userCollectionRef = db.collection("users");
    const result = await userCollectionRef.doc(request.params.id).get();

    if(result.exists) {
      response.status(200).send({ id: result.id, ...result.data() });
    }
    else {
      response.status(404).send();
    }
  }
  catch (error) {
    console.log(error);
    response.status(500).send(error.message);
  }
});

// GET all users
app.get("/", async (request, response) => {
  try {
    const userCollectionRef = db.collection("users");
    const result = await userCollectionRef.get();
    
    let users = [];
    result.forEach((userDoc) => {
      const id = userDoc.id;
      const data = userDoc.data();
      users.push({ id, ...data });
    });
  
    response.status(200).send(users);
  }
  catch(error) {
    console.log(error);
    response.status(500).send(error.message);
  }
});

// Update user
app.put("/:id", async (request, response) => {
  try {
    if(!request.body.name && !request.body.email) {
      return response.status(400).send();
    }
  
    const userRef = db.collection("users").doc(request.params.id);
    const user = await userRef.get();
  
    if(user.exists) {
        const result = await userRef.update(request.body);
        return response.status(200).send(result);
    }
    
    return response.status(404).send("User not found.");
    
  } catch(error) {
    console.log(error);  
    return response.status(500).send(error.message);
  }
});

// Create user
app.post("/", async (request, response) => {
  try {
    const newUser = req.body;

    if(!newUser.name || !newUser.email) { 
      return response.status(400).send("Both name and email is required (from server).");
    }
    
    const userCollectionRef = db.collection("users");
    const result = await userCollectionRef.add(newUser);
    
    return response.status(200).send(result.id);

  } catch(error) {
    console.log(error);
    return response.status(500).send(error.message);
  }
});

// Delete user
app.delete("/:id", async (request, response) => {
  try {
    const userRef = db.collection("users").doc(request.params.id);
    const user = await userRef.get();
  
    if(user.exists) {
        const result = await user.ref.delete();
        return response.status(200).send(result);
    }
    
    return response.status(404).send();
    
  } catch(error) {
    console.log(error);
    return response.status(500).send(error.message);
  }
});


exports.users = functions.https.onRequest(app);
