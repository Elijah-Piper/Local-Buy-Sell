package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ListingService {

    List<Listing> getAll();

    Listing getById(int listingId);

    Account create(Listing listing, int accountId);

    void deleteById(int listingId);

    Listing addImage(MultipartFile file, int listingId) throws IOException;

    ResponseEntity<?> getImage(int imageId);

    Listing editListing(Listing listing, int listingId);
}
