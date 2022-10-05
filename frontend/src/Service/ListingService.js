import axios from 'axios'

const LISTING_API_URL = "http://localhost:8080/listing";
const accessTokenHeader = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
}

class ListingService {

    // GET
    getAll() {
        return axios.get(LISTING_API_URL + "/all", accessTokenHeader)
    }

    getById(listingId) {
        return axios.get(LISTING_API_URL + "/" + listingId, accessTokenHeader);
    }

    // CREATE
    create(listing, accountId) {
        return axios.post(LISTING_API_URL + "/create/" + accountId, listing, accessTokenHeader);
    }

    // DELETE
    deleteById(listingId) {
        return axios.delete(LISTING_API_URL + "/delete/" + listingId, accessTokenHeader);
    }
}

export default new ListingService();