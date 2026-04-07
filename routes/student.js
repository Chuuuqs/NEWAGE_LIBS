const express = require('express');
const { createStudent, getAllStudents, getOneStudent, } = require('../controller/studentController');

const router = express.Router();

router.post('/', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getOneStudent);

module.exports = router;