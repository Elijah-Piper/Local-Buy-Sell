package com.genspark.LocalBuySellAPI.Controller;

import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("account/")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/index")
    public String index() {
        return "<p>Account endpoints:</p>" +
                "<ul>" +
                "<li>GET -> account/{accountId}</li>" +
                "<li>GET -> account/all</li>" +
                "<li>POST -> account/create + new Account requestBody</li>" +
                "<li>PUT -> account/edit/{accountId} + edited Account requestBody</li>" +
                "<li>DELETE -> account/delete/{accountId}</li>" +
                "</ul>";
    }

    @GetMapping("/{accountId}")
    public Account getById(@PathVariable int accountId) {
        return this.accountService.getById(accountId);
    }

    @GetMapping("/all")
    public List<Account> getAll() {
        return this.accountService.getAll();
    }

    @PostMapping("/create")
    public Account create(@RequestBody Account account) {
        return this.accountService.create(account);
    }

    @DeleteMapping("/delete/{accountId}")
    public void deleteById(@PathVariable int accountId) {
        this.accountService.deleteById(accountId);
    }

    @PutMapping("/edit/{accountId}")
    public Account edit(@PathVariable int accountId, @RequestBody Account account) {
        return this.accountService.editAccount(account, accountId);
    }

}
