const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const app = express();
const port = 3000;

const mongoEndpoint = `mongodb://${process.env.MONGO_IP || 'localhost'}:27017`;

let mongoDB;
MongoClient.connect(mongoEndpoint, (err, client) => {
  assert.ifError(err);
  mongoDB = client.db('project1');
  console.log('💽 Connected correctly to server.');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  const usersCollections = mongoDB.collection('users');
  usersCollections.find({}).toArray((err, users) => {
    res
      .status(200)
      .send({
        users
      });
  });
});

app.post('/users', (req, res) => {
  const usersCollections = mongoDB.collection('users');
  usersCollections.insertOne({ name: 'John Doe' }, err => {
    if (err) {
      res.code(400).send(err);
      return;
    }
    res
      .status(201)
      .send({ result: 'OK' });
  });
});

const server = app.listen(port, () => {
  console.log(`🦓 Starting server at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => console.log('🏁 Server is closed'));
  mongoClient.close(() => console.log('🏁 MongoClient is closed'));
});
