import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});
//Servislerin tanımlanması
export const bookService = {
    getAllBooks: () => api.get('/books'),
    createBook: (book) => api.post('/books', book),
    updateBook: (id, book) => api.put(`/books/${id}`, book),
    getBooksStartingWithA: () => api.get('/books/a-books'),
    getBooksAfter2023: () => api.get('/books/after-2023'),
    searchBooks: (searchTerm) => api.get(`/books/search?q=${encodeURIComponent(searchTerm)}`)
};

export const authorService = {
    getAllAuthors: () => api.get('/authors')
};

export const publisherService = {
    getAllPublishers: () => api.get('/publishers'),
    getTwoRandomPublishers: () => api.get('/publishers/random')
};

export default api; 