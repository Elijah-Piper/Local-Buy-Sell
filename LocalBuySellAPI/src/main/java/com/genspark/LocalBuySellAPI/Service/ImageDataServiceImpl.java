package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Dao.ImageDao;
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
import java.util.Optional;

@Service
public class ImageDataServiceImpl implements ImageDataService {

    @Autowired
    private ImageDao imageDao;

    @Override
    public ResponseEntity<?> getImage(int imageId) {
        Optional<ImageData> dbImageData = this.imageDao.findById(imageId);
        byte[] image = ImageUtils.decompressImage(dbImageData.get().getImage());
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(image);
    }

    @Override
    public Account setProfilePicture(MultipartFile file, int accountId) throws IOException {
        ImageData image = new ImageData(file);

        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");
        SessionFactory factory = cfg.buildSessionFactory();
        Session session = factory.openSession();
        Transaction t = session.beginTransaction();

        Account account = session.get(Account.class, accountId);

        account.setProfilePicture(image);

        t.commit();

        session.close();
        factory.close();

        return account;
    }

    @Override
    public Listing addListingImage(MultipartFile file, int listingId) throws IOException {
        ImageData image = new ImageData(file);

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
    public void deleteImage(int imageId) {
        this.imageDao.deleteById(imageId);
    }
}
