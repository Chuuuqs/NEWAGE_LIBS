const Student = require('../models/student');
const cloudinary = require('../config/cloudinaryConfig');
const { Readable } = require('stream');

module.exports.createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getOneStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateStudentImage = async (req, res) => {
    try { 
        const studentId = req.params.id;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (student.image) {
            const publicId = student.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`studentsfolder/${publicId}`);
        }

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const uploadFromBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'studentsfolder' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                const readable = new Readable();
                readable.push(buffer);
                readable.push(null);
                readable.pipe(stream);
            });
        };

        const uploadResult = await uploadFromBuffer(req.file.buffer);
        student.image = uploadResult.secure_url;
        await student.save();
        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};