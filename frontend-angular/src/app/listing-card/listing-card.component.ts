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

  @Input() props: { listing: any; name: string };
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.img === '' && this.props.listing && this.props.listing.images.length !== 0) {
      this.getImage();
    } else if (this.props.listing) {
      this.img = "https://media.istockphoto.com/id/1396039964/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?b=1&s=170667a&w=0&k=20&c=hzLqz1qI7UtmGgCRRdGXghrNPE8zg8a0D6SgRQ8AiIA="
    }
  }

  handleDeleteBtnClick() {
    if (confirm("Are you sure you want to delete this listing?")) {
      this.deleteListing()
    }
  }

  getImage() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    this.http.get(this.ROOT_URL + `/image/${this.props.listing.images[0].imageId}`, {
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

  deleteListing() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    this.http.delete(this.ROOT_URL + `/listing/delete/${this.props.listing.listingId}`, {
      headers: httpHeaders
    }).subscribe((response) => {
      console.log("Successfully deleted")
      location.reload();
    }, (error) => {
      console.log(`DELETION ERROR:`)
      console.log(error);
    })
  }

}
