const mongoose = require('mongoose');
// Mongoose schema
const Schema = mongoose.Schema;
// Schema with 4 fields - username, description, duration and date
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    // when it was created and modified 
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;