const express = require('express');
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controller/authorController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllAuthors);

router.get('/:id', getAuthorById);

router.post('/', protect, authorize('admin', 'librarian'), createAuthor);

router.put('/:id', protect, authorize('admin', 'librarian'), updateAuthor);

router.delete('/:id', protect, authorize('admin'), deleteAuthor);

module.exports = router;
