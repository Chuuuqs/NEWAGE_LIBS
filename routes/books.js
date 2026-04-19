const express = require('express');
const { getAllBooks, getOverdueBooks, getBookById, createBook, updateBook, deleteBook, borrowBook, returnBook } = require('../controller/bookController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/overdue', protect, authorize('admin'), getOverdueBooks);

router.get('/:id', getBookById);

router.post('/', protect, authorize('admin'), createBook);

router.put('/:id', protect, authorize('admin'), updateBook);

router.delete('/:id', protect, authorize('admin'), deleteBook);

router.post('/:id/borrow', protect, authorize('admin', 'librarian'), borrowBook);

router.post('/:id/return', returnBook);

module.exports = router;