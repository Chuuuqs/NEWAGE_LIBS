const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    matricNo: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        default: ""
    },

    password: {
        type: String, 
        required: true
    },

    role: {
        type: String,
         default: 'student',
          required: true
        }
}, 
{ timestamps: true });

module.exports = mongoose.model('Student', studentSchema);