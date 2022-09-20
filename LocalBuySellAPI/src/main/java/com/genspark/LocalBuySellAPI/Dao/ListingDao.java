package com.genspark.LocalBuySellAPI.Dao;

import com.genspark.LocalBuySellAPI.Entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingDao extends JpaRepository<Listing, Integer> {
}
