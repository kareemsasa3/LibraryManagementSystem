package com.capgemini.library.service;

import com.capgemini.library.model.Book;
import com.capgemini.library.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }

    public Book getBookById(Long bookId) throws Exception {
        return bookRepository.findById(bookId).orElseThrow(() -> new Exception("Book not found on :: " + bookId));
    }

    public List<Book> saveBooks(List<Book> bookList) {
        return bookRepository.saveAll(bookList);
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }
}
