// We need express router since that is the route we are creating 
const router = require('express').Router();
// Require the mongoose model 
let Exercise = require('../models/exercise.model');

// First endpoint that handles HTTP GET requests on the /exercises/ url path
router.route('/').get((req, res) => {
    // Mongoose method gets the list of all the Exercises from the MongoDB Atlas DB in json
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles incoming HTTP POST requests
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    
    // save new user to the DB, return 'User added' in JSON
    newExercise.save()
        .then( () => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

// id is an object id created automatically by MongoDB, get an exercies and return it in JSON
router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
// delete the exercise by id
router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
// update exercise by id
router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Export the router 
module.exports = router;