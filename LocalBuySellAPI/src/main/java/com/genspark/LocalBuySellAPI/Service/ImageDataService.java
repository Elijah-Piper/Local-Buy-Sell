package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Dao.ImageDao;
import com.genspark.LocalBuySellAPI.Entity.Account;
import com.genspark.LocalBuySellAPI.Entity.ImageData;
import com.genspark.LocalBuySellAPI.Entity.Listing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageDataService {

    ResponseEntity<?> getImage(int imageId);

    Account setProfilePicture(MultipartFile file, int accountId) throws IOException;

    Listing addListingImage(MultipartFile file, int listingId) throws IOException;

    void deleteImage(int imageId);
}
