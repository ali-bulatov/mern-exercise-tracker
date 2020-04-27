// Require all things we are going to need
const express = require('express');
const cors = require('cors');
// Helps us to connect to our MongoDB DB
const mongoose = require('mongoose');

// Configures environment variables to be in the .env file
require('dotenv').config();

// Create express server
const app = express();
var server_port = process.env.PORT || 80;
var server_host = process.env.localhost || '0.0.0.0';

// Middleware 
app.use(cors());
// Allows to parse json
app.use(express.json());

// Our DB uri, get from ATLAS_DB dashboard
const uri = process.env.ATLAS_URI;
// Start our connection, uri - where our DB is stored
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

// Require the route files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
// Use the route files
// Now whenever someone goes to root/exercies it is going to load everything inside the exercisesRouter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start the server, start listening on a 5000 port
app.listen(server_port, server_host, () => {
    console.log(`Server is running on port: ${server_port}`);
});