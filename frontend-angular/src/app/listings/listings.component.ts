import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  readonly ROOT_URL = "http://localhost:8080";

  listings = [];

  jwt = localStorage.getItem('jwt');

  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt")) {
      this.getAllListings();
    }
  }

  ngOnInit(): void {
  }

  getAllListings() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    this.http.get(this.ROOT_URL + '/listing/all', {
      headers: httpHeaders,
    }).subscribe((result: any) => {
      if (result.IsSuccess === false && result.ErrorMsg != null) {
        console.log(`Error occurred: ${result.ErrorMsg}`);
      } else {
        this.listings = result;
      }
    })
  }

}
