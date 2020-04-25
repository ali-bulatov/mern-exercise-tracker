const mongoose = require('mongoose');
// Mongoose schema
const Schema = mongoose.Schema;
// Schema with one field - username
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    // when it was created and modified 
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;