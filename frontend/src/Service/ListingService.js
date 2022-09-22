import axios from 'axios'

const LISTING_API_URL = "http://localhost:8080/listing";

class ListingService {

    // GET
    getAll() {
        return axios.get(LISTING_API_URL + "/all");
    }

    getById(listingId) {
        return axios.get(LISTING_API_URL + "/" + listingId);
    }

    // CREATE
    create(listing, accountId) {
        return axios.post(LISTING_API_URL + "/create/" + accountId, listing);
    }

    // DELETE
    deleteById(listingId) {
        return axios.delete(LISTING_API_URL + "/delete/" + listingId);
    }
}

export default new ListingService();