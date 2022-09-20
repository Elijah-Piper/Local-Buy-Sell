package com.genspark.LocalBuySellAPI.Controller;

import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import com.genspark.LocalBuySellAPI.Service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("listing/")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @GetMapping("/index")
    public String index() {
        return "<p>Listing endpoints:</p>" +
                "<ul>" +
                "<li>GET -> listing/{listingId}</li>" +
                "<li>GET -> listing/all</li>" +
                "<li>POST -> listing/create + Listing requestBody</li>" +
                "<li>DELETE -> listing/delete/{listingId}</li>" +
                "</ul>";
    }

    @GetMapping("/{listingId}")
    public Listing getById(@PathVariable int listingId) {
        return this.listingService.getById(listingId);
    }

    @GetMapping("/all")
    public List<Listing> getAll() {
        return this.listingService.getAll();
    }

    @PostMapping("/create/{accountId}")
    public Account create(@RequestBody Listing listing, @PathVariable int accountId) {
        return this.listingService.create(listing, accountId);
    }

    @DeleteMapping("/delete/{listingId}")
    public void deleteById(@PathVariable int listingId) {
        this.listingService.deleteById(listingId);
    }
}
