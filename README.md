# Local-Buy-Sell
A community posting board for all your impromptu buying and selling needs.

## Installation
Upon cloning the github repo:
1. The "LocalBuySellAPI" directory will contain the Spring Boot backend API (JDK 18 required)
    - Two configuration files must be changed to for database to work locally: hibernate.cfg.xml and application.properties
        - Must replace with your own MySQL schema, MySQL username, and password
    - Can be finally started by running LocalBuySellApplication.java
        - If successfully configured, the API should be open to requests through localhost:8080
2. The "frontend" directory should contain the ReactJS frontend code (NodeJS required)
    - Within the "frontend" directory, use the command "npm install" to install required dependencies
    - "npm start" wll then start up the development server for the frontend
    - The frontend configuration is already set up to interface with the backend, although by default, the backend will not populate any test data automatically.
    - The frontend will, by default, be accessible from localhost:3030

## API endpoints
1. "/account/**"
    - GET "/account/{accountId}" retrieves a single Account by its accountId
    - GET "/account/all" retrieves a List<Account> containing all accounts saved to the database
    - POST "/account/create" saves a new account to the database based on the Account JSON object provided in the request body
    - PUT "/account/edit/{accountId}" updates an existing Account with the given accountId with the information in the request body
    - DELETE "/account/delete/{accountId}" deletes a single Account with the given accountId from the database
2. "/listing/**"
    - GET "/listing/{listingId}" retrieves a single Listing by its listingId
    - GET "/listing/all" retrieves a Listing<Listing> containing all listings saved to the database
    - POST "/listing/create/{accountId}" saves a new listing provided in the request body, assigning it to the account specifies by the accountId
    - PUT "/listing/edit/{listingId}" updates an existing Listing with the listingId by the information provided in the request body Listing JSON object
    - DELETE "/listing/delete/{listingId}" deletes a single listing with the given listingId
3. "/image/**"
    - GET "/image/{imageId}" retrieves a decompressed image byte[] for display by the given imageId
    - POST "/image/createprofilepicture/{accountId}" saves a new image in the database as an account profile picture belonging to the given accountId (only one profile picture per account)
    - POST "/image/addlistingimage/{listingId}" saves a new image to the List<ImageData> belonging to the given listingId
    - DELETE "/image/delete/{imageId}" deletes the image with the given imageId from the database
