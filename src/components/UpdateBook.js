import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
    const [bookId, setBookId] = useState('');
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

    const handleIdChange = (e) => {
        setBookId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/updateBook/${bookId}`, book);
            alert('Book updated successfully: ' + response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to update book');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Book ID" onChange={handleIdChange} required />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
            <input type="date" name="publicationDate" placeholder="Publication Date" onChange={handleChange} required />
            <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
            <button type="submit">Update Book</button>
        </form>
    );
};

export default UpdateBook;
