import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({
        name: '',
        author: '',
        publicationDate: '',
        genre: ''
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/addBook', book);
            alert('Book added successfully: ' + response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to add book');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
            <input type="date" name="publicationDate" placeholder="Publication Date" onChange={handleChange} required />
            <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
