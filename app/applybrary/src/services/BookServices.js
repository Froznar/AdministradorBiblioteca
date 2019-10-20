import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class BooksService{

    constructor(){}


    getBooks() {
        const url = `${API_URL}/api/books/`;
        return axios.get(url).then(response => response.data);
    }  
    getBooksByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getBook(id) {
        const url = `${API_URL}/api/books/${id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteBook(book){
        const url = `${API_URL}/api/books/${book.id}`;
        return axios.delete(url);
    }
    createBook(book){
        const url = `${API_URL}/api/books/`;
        return axios.post(url,book);
    }
    updateBook(book){
        const url = `${API_URL}/api/books/${book.id}`;
        return axios.put(url,book);
    }
}