package com.genspark.LocalBuySellAPI.Entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Listing {

    @Id
    @Column(name = "listingId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int listingId;

    private String title;

    private LocalDate listDate;

    private boolean isSold;

    public Listing() {
        this.isSold = false;
        this.listDate = LocalDate.now();
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

    public boolean isSold() {
        return isSold;
    }

    public void setSold(boolean sold) {
        isSold = sold;
    }

    @Override
    public String toString() {
        return "Listing{" +
                "listingId=" + listingId +
                ", title='" + title + '\'' +
                ", listDate=" + listDate +
                ", isSold=" + isSold +
                '}';
    }
}
