const Librarian = require('../models/librarian');


module.exports.createLibrarian = async (req, res) => {
    try {
        const newLibrarian = new Librarian(req.body);
        const savedLibrarian = await newLibrarian.save();

        res.status(201).json(savedLibrarian);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllLibrarians = async (req, res) => {
    try {
        const librarians = await Librarian.find();
        res.status(200).json(librarians);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};