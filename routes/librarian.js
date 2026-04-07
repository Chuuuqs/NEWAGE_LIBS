const express = require('express');
const { createLibrarian, getAllLibrarians } = require('../controller/librarianController');

const router = express.Router();

router.post('/librarians', createLibrarian);

router.get('/librarians', getAllLibrarians);

module.exports = router;