import axios from 'axios'

const IMAGE_DATA_API_URL = "http://localhost:8080/image";


class ImageDataService {

    getImage(imageId) {
        return axios.get(IMAGE_DATA_API_URL + "/" + imageId, { 
          responseType: 'arraybuffer' ,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }})
        .then((response) => {
          let image = btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
        });
    }
}

export default new ImageDataService();