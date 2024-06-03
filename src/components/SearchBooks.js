import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/searchBooks?name=${search}`);
            setBooks(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to search books');
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search by name" onChange={handleChange} required />
                <button type="submit">Search</button>
            </form>
            <ul>
                {books.map(book => (
                    <li key={book._id}>{book.name} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBooks;
