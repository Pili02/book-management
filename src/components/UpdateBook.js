import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
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
            const response = await axios.put(`http://localhost:3000/updateBook`, book);
            alert('Book updated successfully: ' + response.data);
        } catch (error) {
            console.error('Error updating book:', error);
            alert('Failed to update book: ' + error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
            <input type="date" name="publicationDate" placeholder="Publication Date" onChange={handleChange} required />
            <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
            <button type="submit">Update Book</button>
        </form>
    );
};

export default UpdateBook;
