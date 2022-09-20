package com.genspark.LocalBuySellAPI.testingweb;

import static org.assertj.core.api.Assertions.assertThat;

import com.genspark.LocalBuySellAPI.Controller.AccountController;
import com.genspark.LocalBuySellAPI.Controller.ListingController;
import com.genspark.LocalBuySellAPI.Dao.AccountDao;
import com.genspark.LocalBuySellAPI.Dao.ListingDao;
import com.genspark.LocalBuySellAPI.Service.AccountService;
import com.genspark.LocalBuySellAPI.Service.ListingService;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SmokeTest {

    @Autowired
    private AccountController accountController;

    @Autowired
    private ListingController listingController;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ListingService listingService;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private ListingDao listingDao;

    @Test
    public void accountControllerLoads() throws Exception {
        assertThat(accountController).isNotNull();
    }

    @Test
    public void listingControllerLoads() throws Exception {
        assertThat(listingController).isNotNull();
    }

    @Test
    public void accountServiceLoads() throws Exception {
        assertThat(accountService).isNotNull();
    }

    @Test
    public void listingServiceLoads() throws Exception {
        assertThat(listingService).isNotNull();
    }

    @Test
    public void accountDaoLoads() throws Exception {
        assertThat(accountDao).isNotNull();
    }

    @Test
    public void listingDaoLoads() throws Exception {
        assertThat(listingDao).isNotNull();
    }
}
