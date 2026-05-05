const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},

    isbn: {type: String, unique: true, required: true},

    author: [{type: mongoose.Schema.Types.ObjectId, ref: "Author"}],

    borrowedBy: {type: mongoose.Schema.Types.ObjectId, ref: "Students"},

    status: {type: String, 
        enum: ["IN", "OUT"],
        default: "IN"
    },

    issuedBy: {type: mongoose.Schema.Types.ObjectId, ref: "librarian"},

    returnDate: {type: Date, default: null}
    
},
{timestamps: true})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;