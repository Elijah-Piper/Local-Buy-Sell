package com.genspark.LocalBuySellAPI.Controller;

import com.genspark.LocalBuySellAPI.Dao.ImageDao;
import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.ImageData;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import com.genspark.LocalBuySellAPI.Service.ListingService;
import com.genspark.LocalBuySellAPI.Util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("listing/")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @Autowired
    private ImageDao imageDao;

    @GetMapping("/index")
    public String index() {
        return "<p>Listing endpoints:</p>" +
                "<ul>" +
                "<li>GET -> listing/{listingId}</li>" +
                "<li>GET -> listing/all</li>" +
                "<li>POST -> listing/create + new Listing requestBody</li>" +
                "<li>PUT -> listing/edit/{listingId} + edited Listing requestBody</li>" +
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


    @PutMapping("/edit/{listingId}")
    public Listing edit(@PathVariable int listingId, @RequestBody Listing listing) {
        return this.listingService.editListing(listing, listingId);
    }
}
