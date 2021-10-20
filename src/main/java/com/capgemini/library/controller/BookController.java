package com.capgemini.library.controller;

import com.capgemini.library.model.Book;
import com.capgemini.library.service.BookService;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookController {

    private final BookService bookService;

    @GetMapping(value = {"/books", "/books/{genre}"})
    public ResponseEntity<List<Book>> getAllBooks(@PathVariable(required = false) String genre) {
        List<Book> bookList;
        if (genre != null)
            bookList = bookService.getBooksByGenre(genre);
        else
            bookList = bookService.getBooks();
        return new ResponseEntity<>(bookList, HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<String> uploadBooks(@RequestParam("file") MultipartFile file) throws Exception {
        List<Book> bookList = new ArrayList<>();
        InputStream inputStream = file.getInputStream();
        CsvParserSettings setting = new CsvParserSettings();
        setting.setHeaderExtractionEnabled(true);
        CsvParser parser = new CsvParser(setting);
        List<Record> parseAllRecords = parser.parseAllRecords(inputStream);
        parseAllRecords.forEach(records -> {
            Book book = new Book();
            book.setTitle(records.getString("Title"));
            book.setAuthor(records.getString("Author"));
            book.setGenre(records.getString("Genre"));
            bookList.add(book);
        });
        bookService.saveBooks(bookList);
        return new ResponseEntity<>("Upload success", HttpStatus.OK);
    }

    @PostMapping("/book/create")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book b = bookService.saveBook(book);
        return new ResponseEntity<>(b, HttpStatus.OK);
    }

    @PutMapping("/book/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable(value = "id") Long bookId, @RequestBody Book bookDetails)
        throws Exception
    {
        Book book = bookService.getBookById(bookId);
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setGenre(bookDetails.getGenre());
        final Book updatedBook = bookService.saveBook(book);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @DeleteMapping("/book/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable(value = "id") Long bookId) throws Exception {
        Book book = bookService.getBookById(bookId);
        bookService.deleteBook(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
