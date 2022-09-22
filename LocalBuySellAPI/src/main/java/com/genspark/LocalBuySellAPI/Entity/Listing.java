package com.genspark.LocalBuySellAPI.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int listingId;

    private String title;

    @OneToMany(fetch = FetchType.EAGER, targetEntity = ImageData.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "listingId")
    private List<ImageData> images;

    private int price;

    private LocalDate listDate;

    private boolean isSold;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account")
    @JsonIgnoreProperties("listings")
    private Account account;

    public Listing() {
        this.isSold = false;
        this.listDate = LocalDate.now();
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<ImageData> getImages() {
        return images;
    }

    public void setImages(List<ImageData> images) {
        this.images = images;
    }

    public void addImage(ImageData imageData) {
        this.images.add(imageData);
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getListingId() {
        return listingId;
    }

    public void setListingId(int listingId) {
        this.listingId = listingId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getListDate() {
        return listDate;
    }

    public void setListDate(LocalDate listDate) {
        this.listDate = listDate;
    }

    public boolean getIsSold() {
        return isSold;
    }

    public void setIsSold(boolean sold) {
        isSold = sold;
    }

    @Override
    public String toString() {
        return "Listing{" +
                "listingId=" + listingId +
                ", title='" + title + '\'' +
                ", no. of photos=" + images.size() +
                ", price=" + price +
                ", listDate=" + listDate +
                ", isSold=" + isSold +
                ", account=" + account +
                '}';
    }
}
