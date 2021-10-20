package com.capgemini.library.controller;

import com.capgemini.library.model.Book;
import com.capgemini.library.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebAppConfiguration
@ExtendWith(MockitoExtension.class)
class BookControllerTests {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Mock
    private BookService bookService;

    @InjectMocks
    @Spy
    private BookController bookController;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).alwaysDo(MockMvcResultHandlers.print())
                .build();
    }

    @Test
    void getAllBooks_test() {
        List<Book> bookList = new ArrayList<>();
        when(bookService.getBooks()).thenReturn(bookList);
        when(bookService.getBooksByGenre("test")).thenReturn(bookList);
        ResponseEntity<?> expectedResponseEntity = bookController.getAllBooks(null);
        assertTrue(expectedResponseEntity.hasBody(), "Response body is null");
        expectedResponseEntity = bookController.getAllBooks("test");
        assertTrue(expectedResponseEntity.hasBody(), "Response body is null");
    }

    @Test
    void uploadBooks_test() throws Exception {
        MockMultipartFile file = new MockMultipartFile("test.json", "",
                "application/json", "{\"key1\": \"value1\"}".getBytes());

        
        mockMvc.perform(multipart("/book").file(file)).andExpect(status().isOk())
                .andExpect(content().string("Upload success"));
    }
}
