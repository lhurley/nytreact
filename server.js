require('dotenv').config();
const path = require('path');
global.appRoot = __dirname;

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true });

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
global.socketio = require('socket.io')(httpServer);

app.use(bodyParser.json());

app.use(require('./routes')(express));

httpServer.listen(PORT, HOST, () => console.log(`Now listening on ${HOST}:${PORT}`));
