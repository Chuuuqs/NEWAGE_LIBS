const express = require('express');
const upload = require('../middleware/cloudinary');
const { createStudent, getAllStudents, getOneStudent, updateStudentImage } = require('../controller/studentController');

const router = express.Router();

router.post('/', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getOneStudent);

router.put('/:id/image', upload.single('image'), updateStudentImage);

module.exports = router;