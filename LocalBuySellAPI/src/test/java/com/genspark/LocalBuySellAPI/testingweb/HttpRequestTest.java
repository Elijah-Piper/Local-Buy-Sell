package com.genspark.LocalBuySellAPI.testingweb;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HttpRequestTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void accountIndexReturnsPopulatedString() throws Exception {
        assertThat(this.restTemplate.getForObject(
                "http://localhost:" + port + "/account/index",
                String.class)).contains("Account endpoints:");
    }

    @Test
    public void listingIndexReturnsPopulatedString() throws Exception {
        assertThat(this.restTemplate.getForObject(
                "http://localhost:" + port + "/listing/index",
                String.class)).contains("Listing endpoints:");
    }
}
