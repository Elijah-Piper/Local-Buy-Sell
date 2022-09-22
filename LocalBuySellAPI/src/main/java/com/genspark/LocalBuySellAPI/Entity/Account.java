package com.genspark.LocalBuySellAPI.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "account")
    @JsonIgnoreProperties("account")
    private List<Listing> listings;

    private String email;

    private String firstName;
    private String lastName;

    private String phoneNumber;

    @OneToOne(fetch = FetchType.EAGER, targetEntity = ImageData.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId")
    private ImageData profilePicture;

    public Account() {
    }

    public ImageData getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(ImageData profilePicture) {
        this.profilePicture = profilePicture;
    }

    public void addListing(Listing listing) {
        this.listings.add(listing);
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public List<Listing> getListings() {
        return listings;
    }

    public void setListings(List<Listing> listings) {
        this.listings = listings;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", listings=" + listings +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
