import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../models/listing.model';

declare var $: any;

interface ImgSrcData {
  id: number,
  src: string,
  name: string,
  size: string
}

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  readonly ROOT_URL = "http://localhost:8080";

  jwt = localStorage.getItem('jwt');
  listing: Listing;
  images: ImgSrcData[] = [];

  constructor(private http: HttpClient, private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.jwt && this.jwt !== 'exp') {
      this._activateRoute.params.subscribe(params => {
        this.populateListingInfo(params['listingId']);
      })
    }
  }

  elementById(id: string) {
    return document.getElementById(id);
  }

  populateListingInfo(listingId: number) {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    this.http.get(this.ROOT_URL + `/listing/${listingId}`, {
      headers: httpHeaders
    }).subscribe((response: any) => {
      this.listing = response;
      this.getImages();
    }, (error) => {
      console.log("ERROR GETTING LISTING");
      console.log(error);
    })
  }

  getImages() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    for (let i = 0; i < this.listing.images.length; i++) {
      let imgId: number = this.listing.images[i].imageId;
      let imgName: string = this.listing.images[i].name;

      this.http.get(this.ROOT_URL + `/image/${imgId}`, {
        responseType: 'arraybuffer',
        headers: httpHeaders,
        observe: 'response'
      }).subscribe((r: any) => {
        let image = btoa(
          new Uint8Array(r.body)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        let responseImageSrc = `data:${r.headers.get('content-type').toLowerCase()};base64,${image}`;
        this.images.push({
          id: imgId, 
          src: responseImageSrc,
          name: imgName,
          size: this.formatBytes(this.getBytesFromString(responseImageSrc)),
        });
      }, (e) => {
        console.log("\nERROR getting profile picture from DB");
        console.log(e);
      })
    }
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  getBytesFromString(str: string): number {
    return new Blob([str]).size;
  }

}
