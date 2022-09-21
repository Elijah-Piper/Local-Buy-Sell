package com.genspark.LocalBuySellAPI.Entity;

import com.genspark.LocalBuySellAPI.Util.ImageUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
import java.util.Arrays;

@Entity
public class ImageData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;

    private String name;

    private String type;

    @Column(name = "image", nullable = false, length = 100000)
    @Lob
    private byte[] image;

    public ImageData() {
    }

    public ImageData(MultipartFile file) {
        this.name = (file.getOriginalFilename());
        this.type = (file.getContentType());
        try {
            this.image = (ImageUtils.compressImage(file.getBytes()));
        } catch (IOException e) {
            throw new RuntimeException("IOException occurred in ImageData parameterized constructor.");
        }
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Image{" +
                "imageId=" + imageId +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
