import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { FileHandle } from '../models/file-handle.model';
import { Listing } from '../models/listing.model';

interface listingDetails {
  title: FormControl<string>,
  price: FormControl<number>,
  description: FormControl<string>
}
interface ImgSrcData {
  id: number,
  src: string,
  name: string,
  size: string,
  removed: boolean
}

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  listingId: number;

  listing: Listing;

  readonly ROOT_URL = "http://localhost:8080";

  jwt = localStorage.getItem('jwt');

  newImages: FileHandle[] = [];
  oldImages: ImgSrcData[] = [];

  errors = {
    title: '',
    price: '',
    description: '',
    oldImages: '',
    newImages: '',
    editListing: ''
  }

  listingForm: FormGroup;

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute, private sanitizer: DomSanitizer, private _router: Router) { }

  get title() {
    return this.listingForm.get('title');
  }

  get price() {
    return this.listingForm.get('price');
  }

  get description() {
    return this.listingForm.get('description');
  }

  ngOnInit(): void {
    if (this.jwt && this.jwt !== 'exp') {
      this._Activatedroute.params.subscribe(params => {
        this.listingId = params['listingId'];
        this.populateListingInfo();
      })
    }
  }

  getExistingImages() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    console.log("all images");
    console.log(this.listing.images);
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
        this.oldImages.push({
          id: imgId, 
          src: responseImageSrc,
          name: imgName,
          size: this.formatBytes(this.getBytesFromString(responseImageSrc)),
          removed: false
        });
        console.log(this.oldImages);
      }, (e) => {
        console.log("\nERROR getting profile picture from DB");
        console.log(e);
      })
    }
  }

  goToAccountDetails() {
    this._router.navigateByUrl("/account-details");
  }

  handleFileInput(target: any) {
    let files = (target as HTMLInputElement).files;
    if (files) for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const fileHandle: FileHandle = {
        file: f,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(f)
        )
      }
      this.newImages.push(fileHandle);
    }
  }

  handleRemoveNewImg(i: number) {
    if (this.newImages.length >= i && i > -1) {
      this.newImages.splice(i, 1);
    }
  }

  removeOldImg(imageId: number) {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    this.http.delete(this.ROOT_URL + `/image/delete/${imageId}`, {
      headers: httpHeaders
    }).subscribe((response) => {
      console.log("successful img deletion");
    }, (error) => {
      console.log("ERROR OCCURRED DELETING IMAGE FROM LISTING");
      console.log(error);
    })
  }

  createRange(n: number): number[] {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
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

  populateListingInfo() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    this.http.get(this.ROOT_URL + `/listing/${this.listingId}`, {
      headers: httpHeaders
    }).subscribe((response: any) => {
      this.listing = response;
      this.listingForm = new FormGroup({
        title: new FormControl(this.listing.title, Validators.required),
        price: new FormControl(this.listing.price, Validators.required),
        description: new FormControl(this.listing.description, Validators.required)
      })
      this.getExistingImages();
    }, (error) => {
      console.log("ERROR GETTING EDITING LISTING");
      console.log(error);
    })
  }

  addImgToListing(img: File, listingId: number) {
    let httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`);
    let httpBody = new FormData();
    httpBody.append('image', img, img.name)
    httpBody.append('reportProgress', "true");

    this.http.post(this.ROOT_URL + `/image/addlistingimage/${listingId}`, httpBody, {
      headers: httpHeaders
    }).subscribe((response: any) => {
      console.log('\nIMG UPLOAD SUCCESS\n');
      console.log(response);
    }, (error) => {
      console.log('\nIMG UPLOAD HTTP ERROR...\n');
      console.log(error);
    })
  }

  editListing() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })

    let updatedListing = {
      title: this.title?.value,
      price: this.price?.value,
      description: this.description?.value,
    }

    for (let i = 0; i < this.oldImages.length; i++) {
      if (this.oldImages[i].removed) {
        this.removeOldImg(this.oldImages[i].id);
      }
    }

    if (this.newImages) {
      for (let i = 0; i < this.newImages.length; i++) {
        this.addImgToListing(this.newImages[i].file, this.listing.listingId);
      }
    }

    this.http.put(this.ROOT_URL + `/listing/edit/${this.listingId}`, updatedListing, {
      headers: httpHeaders
    }).subscribe((response: any) => {
      console.log("success");
      console.log(response);
      this._router.navigateByUrl("/account-details");
    }, (error) => {
      console.log("ERROR GETTING EDITING LISTING");
      console.log(error);
    })
  }

  validateTitle(): boolean {
    if (this.title === null || this.title.value?.valueOf() === undefined) {
      this.errors.title = "ERROR: the form control was returned as null";
      return false;
    } else if (this.title.value === "") {
      this.errors.title = "Title is required";
      return false;
    } else if (this.title.value.length < 2 || this.title.value.length > 28) {
      this.errors.title = "Title must be between 2 and 28 characters in length";
      return false;
    } else {
      this.errors.title = "";
      return true;
    }
  }

  validatePrice(): boolean {
    if (this.price === null) {
      this.errors.price = "ERROR: the form control was returned as null";
      return false;
    } else if (this.price.value === null) {
      this.errors.price = "Price is required";
      return false;
    } else if (this.price.value < 0) {
      this.errors.price = "Price cannot be negative";
      return false;
    } else if (this.price.value >= 1000000000) {
      this.errors.price = "Price cannot be more than 1 billion";
      return false;
    } else {
      this.errors.price = "";
      return true;
    }
  }

  validateDescription(): boolean {
    if (this.description === null || this.description.value?.valueOf() === undefined) {
      this.errors.description = "ERROR: the form control was returned as null";
      return false;
    } else if (this.description.value === "") {
      this.errors.description = "Description is required";
      return false;
    } else if (this.description.value.length < 15) {
      this.errors.description = "Description is too short, must be 15 characters or more";
      return false;
    } else if (this.description.value.length > 1000) {
      this.errors.description = "Description is too long, 1000 characters maximum";
      return false;
    } else {
      this.errors.description = "";
      return true;
    }
  }

  validateImages(): boolean {
    let numOfImgs = this.newImages.length;
    for (let i = 0; i < this.oldImages.length; i++) {
      if (! this.oldImages[i].removed) {
        numOfImgs++;
      }
    }

    if (numOfImgs === 0) {
      this.errors.newImages = "At least 1 image is required";
      return false;
    } else if (numOfImgs > 12) {
      this.errors.newImages = "12 images maximum, please remove some"
      return false;
    } else {
      for (let i = 0; i < this.newImages.length; i++) {
        let im = this.newImages[i].file;
        if (im?.type !== "image/jpeg" && im?.type !== "image/png" && im?.type !== "image/webp") {
          this.errors.newImages = "Only PNG, JPG/JPEG, or WEBP image types allowed"
          return false;
        }
      }
      this.errors.newImages = "";
      return true;
    }
  }

  validate(): boolean {
    let titleValid = this.validateTitle();
    let priceValid = this.validatePrice();
    let descriptionValid = this.validateDescription();
    let imagesValid = this.validateImages();

    return titleValid && priceValid && descriptionValid && imagesValid;
  }

  onSubmit() {
    if (this.validate()) {
      this.errors.editListing = '';
      console.log("VALIDATED");
      this.editListing();
    } else {
      if (!this.errors.editListing) {
        let invalid: string[] = []
        let msg = '';

        if (this.errors.title) invalid.push('title');
        if (this.errors.price) invalid.push('price');
        if (this.errors.description) invalid.push('description');
        if (this.errors.newImages) invalid.push('images');

        switch (invalid.length) {
          case 1:
            msg = invalid[0];
            break;
          case 2:
            msg = `${invalid[0]} and ${invalid[1]}`;
            break;
          case 3:
            msg = `${invalid[0]}, ${invalid[1]}, and ${invalid[2]}`;
            break;
          case 4:
            msg = `${invalid[0]}, ${invalid[1]}, ${invalid[2]}, and ${invalid[3]}`;
        }

        this.errors.editListing = `Please check your ${msg}`
      }
    }
  }

}
