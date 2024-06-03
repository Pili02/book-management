import React from 'react';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import SearchBooks from './components/SearchBooks';
import DeleteBook from './components/DeleteBook';

const App = () => {
    return (
        <div>
            <h1>Book Management System</h1>
            <h2>Add Book</h2>
            <AddBook />
            <h2>Update Book</h2>
            <UpdateBook />
            <h2>Search Books</h2>
            <SearchBooks />
            <h2>Delete Book</h2>
            <DeleteBook />
        </div>
    );
};

export default App;
