const mongoose = require('mongoose');
const Book = require('../models/books');

module.exports.getAllBooks = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } }
            ]
        };

        const books = await Book.find(query)
            .populate('author borrowedBy issuedBy')
            .skip(skip)
            .limit(limit);

        const total = await Book.countDocuments(query);

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBooks: total,
            books
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getOverdueBooks = async (req, res) => {
    try {
        const today = new Date();

        const overdueBooks = await Book.find({
            status: "OUT",
            returnDate: { $lt: today }
        }).populate('borrowedBy issuedBy');

        res.status(200).json(overdueBooks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getBookById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
           return res.status(400).json({ message: 'Invalid ID' });
}
        const book = await Book.findById(req.params.id)
        .populate('author')
        .populate('borrowedBy')
        .populate('issuedBy');

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.createBook = async (req, res) => {
    try {
        const { isbn } = req.body;

        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ message: "ISBN already exists" });
        }

        const newBook = new Book(req.body);
        const savedBook = await newBook.save();

        res.status(201).json(savedBook);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.updateBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
           return res.status(400).json({ message: 'Invalid ID' });
}
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteBook = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
           return res.status(400).json({ message: 'Invalid ID' });
}
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.borrowBook = async (req, res) => {
    try {
        const { studentId, librarianId, returnDate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        if (!studentId || !librarianId) {
            return res.status(400).json({ message: "studentId and librarianId are required" });
        }

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.status === "OUT") {
            return res.status(400).json({ message: "Book is already borrowed" });
        }

        book.status = "OUT";
        book.borrowedBy = studentId;
        book.issuedBy = librarianId;
        book.returnDate = returnDate;

        await book.save();

        return res.status(200).json({ message: "Borrowed successfully", book });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.returnBook = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.status !== "OUT") {
            return res.status(400).json({ message: "Book is not currently borrowed" });
        }

        book.status = "IN";
        book.borrowedBy = null;
        book.issuedBy = null;
        book.returnDate = null;

        await book.save();

        const updatedBook = await book.populate('borrowedBy issuedBy');

        return res.status(200).json({
            message: "Book returned successfully",
            book: updatedBook
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};