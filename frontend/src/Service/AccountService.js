import axios from 'axios';

const ACCOUNT_API_URL = "http://localhost:8080/account";

class AccountService {
    
    // GET
    getAll() {
        return axios.get(ACCOUNT_API_URL + "/all");
    }

    getById(accountId) {
        return axios.get(ACCOUNT_API_URL + "/" + accountId);
    }

    // CREATE
    create(account) {
        return axios.post(ACCOUNT_API_URL + "/create", account)
    }

    // DELETE
    deleteById(accountId) {
        return axios.delete(ACCOUNT_API_URL + "/delete/" + accountId);
    }
}

export default new AccountService();