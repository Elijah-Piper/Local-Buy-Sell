package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Dao.ListingDao;
import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListingServiceImpl implements ListingService {

    @Autowired
    ListingDao listingDao;

    @Override
    public List<Listing> getAll() {
        return this.listingDao.findAll();
    }

    @Override
    public Listing getById(int listingId) {
        Optional<Listing> l = this.listingDao.findById(listingId);
        Listing listing = null;
        if (l.isPresent()) {
            listing = l.get();
        } else {
            throw new RuntimeException("Listing not found for id :: " + listingId);
        }

        return listing;
    }

    @Override
    public Account create(Listing listing, int accountId) {
        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");
        SessionFactory factory = cfg.buildSessionFactory();
        Session session = factory.openSession();
        Transaction t = session.beginTransaction();

        Account account = session.get(Account.class, accountId);

        account.addListing(listing);

        t.commit();

        session.close();
        factory.close();

        return account;
    }

    @Override
    public void deleteById(int listingId) {
        this.listingDao.deleteById(listingId);
    }
}
