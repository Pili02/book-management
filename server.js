const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://tarundecode:Zed05Z5bUH1KHZy2@cluster0.o3mwgly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const bookSchema = new mongoose.Schema({
    name: { type: String, unique: true }, // Making 'name' attribute unique
    author: String,
    publicationDate: Date,
    genre: String
});

const Book = mongoose.model('Book', bookSchema);

// Add a book
app.post('/addBook', async (req, res) => {
    console.log('POST /addBook');
    console.log('Request body:', req.body);
    
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    });

    try {
        const savedBook = await newBook.save();
        console.log('Book added:', savedBook);
        res.status(200).send('Book added successfully: ' + savedBook);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Update a book
app.put('/updateBook/:id', async (req, res) => {
    console.log('PUT /updateBook/:id');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);

    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            console.log('Book not found');
            return res.status(404).send('Book not found');
        }
        console.log('Book updated:', updatedBook);
        res.status(200).send('Book updated successfully: ' + updatedBook);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Search for books
app.get('/searchBooks', async (req, res) => {
    console.log('GET /searchBooks');
    console.log('Query:', req.query);

    try {
        const searchCriteria = req.query;
        const books = await Book.find(searchCriteria).select('_id name author publicationDate genre');
        console.log('Books found:', books);
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Delete a book
app.delete('/deleteBook/:id', async (req, res) => {
    console.log('DELETE /deleteBook/:id');
    console.log('Request params:', req.params);

    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            console.log('Book not found');
            return res.status(404).send('Book not found');
        }
        console.log('Book deleted:', deletedBook);
        res.status(200).send('Book deleted successfully: ' + deletedBook);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch all other routes and return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
