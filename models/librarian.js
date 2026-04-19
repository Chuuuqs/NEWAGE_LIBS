const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    staffId: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    
    password: {
        type: String, 
        required: true},
    role: { 
        type: String, enum: ['librarian', 'student'], default: 'student', 
        required: true}
}, 
{ timestamps: true });

module.exports = mongoose.model('Librarian', librarianSchema);