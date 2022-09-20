package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.Listing;

import java.util.List;

public interface ListingService {

    List<Listing> getAll();

    Listing getById(int listingId);

    Account create(Listing listing, int accountId);

    void deleteById(int listingId);
}
