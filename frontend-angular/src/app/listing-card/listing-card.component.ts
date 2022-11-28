import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  readonly ROOT_URL = "http://localhost:8080";

  img = '';

  @Input() listing: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.img === '' && this.listing && this.listing.images.length !== 0) {
      this.getImage();
    } else if (this.listing) {
      this.img = "https://media.istockphoto.com/id/1396039964/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=hzLqz1qI7UtmGgCRRdGXghrNPE8zg8a0D6SgRQ8AiIA="
    }
  }

  getImage() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    this.http.get(this.ROOT_URL + `/image/${this.listing.images[0].imageId}`, {
      responseType: 'arraybuffer',
      headers: httpHeaders,
      observe: 'response'
    }).subscribe((response: any) => {
      if (response.IsSuccess === false && response.ErrorMsg != null) {
        console.log(`Error occurred: ${response.ErrorMsg}`);
      } else {
        let image = btoa(
          new Uint8Array(response.body)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        this.img = `data:${response.headers.get('content-type').toLowerCase()};base64,${image}`;
      }
    })
  }

}
