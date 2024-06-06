package com.masagal.masaban_server.controllers;

import com.masagal.masaban_server.model.Board;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MasabanController.class)
class MasabanControllerTest {

    @MockBean
    Board mockBoard;
    @Autowired
    private MockMvc mockMvc;
    RestTemplate restTemplate;

    @BeforeEach
    void setup() {
        restTemplate = new RestTemplate();
    }

    @Test
    void shouldRespondOk() throws Exception {
        // Arrange
        // Act
        mockMvc.perform(get("/board/"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnBoardOnRequest() throws Exception {
    }

    @Test
    void shouldStoreBoardOnRequest() {

    }

}