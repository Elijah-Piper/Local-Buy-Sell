package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Dao.ImageDao;
import com.genspark.LocalBuySellAPI.Dao.ListingDao;
import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.ImageData;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import com.genspark.LocalBuySellAPI.Util.ImageUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ListingServiceImpl implements ListingService {

    @Autowired
    private ListingDao listingDao;
    @Autowired
    private ImageDao imageDao;

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

    @Override
    public Listing addImage(MultipartFile file, int listingId) throws IOException {
        ImageData image = new ImageData();
        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setImage(ImageUtils.compressImage(file.getBytes()));

        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");
        SessionFactory factory = cfg.buildSessionFactory();
        Session session = factory.openSession();
        Transaction t = session.beginTransaction();

        Listing listing = session.get(Listing.class, listingId);

        listing.addImage(image);

        t.commit();

        session.close();
        factory.close();

        return listing;
    }

    @Override
    public ResponseEntity<?> getImage(int imageId) {
        Optional<ImageData> dbImageData = this.imageDao.findById(imageId);
        byte[] image = ImageUtils.decompressImage(dbImageData.get().getImage());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @Override
    public Listing editListing(Listing edited, int listingId) {
        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");
        SessionFactory factory = cfg.buildSessionFactory();
        Session session = factory.openSession();
        Transaction t = session.beginTransaction();

        Listing listing = session.get(Listing.class, listingId);

        listing.setTitle(edited.getTitle());
        listing.setPrice(edited.getPrice());
        listing.setIsSold(edited.getIsSold());

        t.commit();

        session.close();
        factory.close();

        return listing;
    }
}
