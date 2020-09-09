const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const app = express();

app.get('/:id', async (request, response) => {
    const userCollectionRef = db.collection('users');
    const result = await userCollectionRef.doc(request.params.id).get();

    const id = result.id;
    const user = result.data();

    response.status(200).send( { id, ...user } );
})

app.get('/', async (request, response) => {
    const userCollectionRef = db.collection('users');
    const result = await userCollectionRef.get();

    let users = [];
    result.forEach((userDoc) => {
        const id = userDoc.id;
        const data = userDoc.data();
        users.push({ id, ...data });
    })

    response.status(200).send(users);
})

app.put('/:id', async (request, response) => {
    const userCollectionRef = db.collection('users');
    const result = await userCollectionRef.doc(request.params.id).update(request.body);

    response.status(200).send(result);
})

app.post('/', async function(request, response) {
    const newUser = request.body;
    const userCollectionRef = db.collection('users');
    const result = await userCollectionRef.add(newUser);

    response.status(200).send(result);
})

app.delete('/:id', async function(request, response) {
    const userId = request.params.id;
    const userCollectionRef = db.collection('users');
    const result = await userCollectionRef.doc(userId).delete();

    response.status(200).send(result);
})

exports.users = functions.https.onRequest(app);