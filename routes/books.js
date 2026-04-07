const express = require('express');
const { getAllBooks, getOverdueBooks, getBookById, createBook, updateBook, deleteBook, borrowBook, returnBook } = require('../controller/bookController');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/overdue', getOverdueBooks);

router.get('/:id', getBookById);

router.post('/', createBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

router.post('/:id/borrow', borrowBook);

router.post('/:id/return', returnBook);

module.exports = router;