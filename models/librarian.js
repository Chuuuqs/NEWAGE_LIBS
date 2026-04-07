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
    }
}, 
{ timestamps: true });

module.exports = mongoose.model('Librarian', librarianSchema);