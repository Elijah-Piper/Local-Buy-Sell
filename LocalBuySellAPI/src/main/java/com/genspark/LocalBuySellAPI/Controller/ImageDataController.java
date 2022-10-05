package com.genspark.LocalBuySellAPI.Controller;

import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import com.genspark.LocalBuySellAPI.Service.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("image/")
public class ImageDataController {

    @Autowired
    private ImageDataService imageDataService;

    @GetMapping("/index")
    public String index() {
        return "<p>Image endpoints:</p>" +
                "<ul>" +
                "<li>GET -> image/{imageId}</li>" +
                "<li>POST -> image/createprofilepicture/{accountId} + 'image' request parameter file (.jpg, .png, etc.)</li>" +
                "<li>POST -> image/addlistingimage/{listingId} + 'image' request parameter file (.jpg, .png, etc.)</li>" +
                "<li>DELETE -> image/delete/{listingId}</li>" +
                "</ul>";
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<?> getImage(@PathVariable int imageId) {
        return this.imageDataService.getImage(imageId);
    }

    @PostMapping("/createprofilepicture/{accountId}")
    public Account createProfilePicture(@PathVariable int accountId, @RequestParam("image") MultipartFile file) throws IOException {
        return this.imageDataService.setProfilePicture(file, accountId);
    }

    @PostMapping("/addlistingimage/{listingId}")
    public Listing addListingImage(@PathVariable int listingId, @RequestParam("image") MultipartFile file) throws IOException {
        return this.imageDataService.addListingImage(file, listingId);
    }

    @DeleteMapping("/delete/{imageId}")
    public void deleteImage(@PathVariable int imageId) {
        this.imageDataService.deleteImage(imageId);
    }

}
