import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    readonly ROOT_URL = "http://localhost:8080/image";

    constructor(private http: HttpClient) {}

    public getProfilePicture(accountId: number) {
        let httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          })
        
        return this.http.get(this.ROOT_URL + `/account/${accountId}`, {
            responseType: 'arraybuffer',
            headers: httpHeaders,
            observe: 'response'
        });
    }
}