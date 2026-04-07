const express = require('express');
const {connectDb} = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDb();

// Routes
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/author');
const studentRoutes = require('./routes/student');
const librarianRoutes = require('./routes/librarian');

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/students', studentRoutes);
app.use('/librarians', librarianRoutes);

app.listen(process.env.PORT || 4206, () => {
    console.log(`Server is running on port ${process.env.PORT || 4206}`);
});