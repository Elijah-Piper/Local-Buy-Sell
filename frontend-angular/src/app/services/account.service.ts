import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    readonly ROOT_URL = "http://localhost:8080/account"

    constructor(private http: HttpClient) {}

    private parseJwtEmail(): string {
        let token = localStorage.getItem('jwt');
    
        if (!token) return '';
    
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload).sub;
      }

    public getByJWT() {
        let email = this.parseJwtEmail();

        let httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          })
        let httpParams = new HttpParams().set('email', email);
    
        return this.http.get<Account>(this.ROOT_URL + "/getbyemail", {
        headers: httpHeaders,
        params: httpParams
        });
    }
}