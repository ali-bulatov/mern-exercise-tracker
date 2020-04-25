// We need express router since that is the route we are creating 
const router = require('express').Router();
// Require the mongoose model 
let User = require('../models/user.model');

// First endpoint that handles HTTP GET requests on the /users/ url path
router.route('/').get((req, res) => {
    // Mongoose method gets the list of all the users from the MongoDB Atlas DB in json
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles incoming HTTP POST requests
router.route('/add').post((req,res) => {
    // new username is part of the request body
    const username = req.body.username;
    // create a new instance of User with username
    const newUser = new User({username});
    // save new user to the DB, return 'User added' in JSON
    newUser.save()
        .then( () => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

// TODO: add update, delete

// Export the router 
module.exports = router;