import React, { useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
    const [bookId, setBookId] = useState('');

    const handleIdChange = (e) => {
        setBookId(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/deleteBook/${bookId}`);
            alert('Book deleted successfully: ' + response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to delete book');
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <input type="text" placeholder="Book ID" onChange={handleIdChange} required />
            <button type="submit">Delete Book</button>
        </form>
    );
};

export default DeleteBook;
