import axios from 'axios'

const TOKEN_API_URL = "http://localhost:8080/token";

class TokenService {

    generate(email, pass) {
        return axios.post(TOKEN_API_URL, {}, {
            headers: {
                Authorization: `Basic ${btoa(email + ':' + pass)}`
            }
        });
    }
    
}

export default new TokenService();