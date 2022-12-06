import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../models/file-handle.model';

interface listingDetails {
  title: FormControl<string>,
  price: FormControl<number>,
  description: FormControl<string>,
}

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  jwt = localStorage.getItem('jwt');

  readonly ROOT_URL = "http://localhost:8080";

  account = {
    accountId: undefined
  };

  images: FileHandle[] = [];

  errors = {
    title: '', 
    price: '',
    description: '',
    images: '',
    createListing: ''
  }

  listingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
  })

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

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
      this.populateAccountInfo();
    }
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
      this.images.push(fileHandle);
    }
  }

  handleRemoveImg(i: number) {
    if (this.images.length >= i && i > -1) {
      this.images.splice(i, 1);
    }
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

  parseJwtEmail(): string {
    let token = localStorage.getItem('jwt');

    if (!token) return '';

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).sub;
  }

  populateAccountInfo() {
    let email = this.parseJwtEmail();

    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    let httpParams = new HttpParams().set('email', email);

    this.http.get(this.ROOT_URL + "/account/getbyemail", {
      headers: httpHeaders,
      params: httpParams
    }).subscribe((response: any) => {
      if (response.IsSuccess === false && response.ErrorMsg != null) {
        console.log(`Error occurred: ${response.ErrorMsg}`);
      } else {
        this.account = response;
      }
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

  createListing() {
    const listing = {
      title: this.title?.value,
      description: this.description?.value,
      price: this.price?.value
    }

    let httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.jwt}`)
    
    this.http.post(this.ROOT_URL + `/listing/create/${this.account.accountId}`, listing, {
      headers: httpHeaders
    }).subscribe((response: any) => {
      console.log('\nSUCCESS\n');
      console.log(response);
      let newListing = response.listings[response.listings.length - 1];
      if (this.images) {
        for (let i = 0; i < this.images.length; i++) {
          this.addImgToListing(this.images[i].file, newListing.listingId);
        }
      }
    }, (error) => {
      console.log('\nHTTP ERROR...\n');
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
    } else if (this.description.value.length > 500) {
      this.errors.description = "Description is too long, 300 characters maximum";
      return false;
    } else {
      this.errors.description = "";
      return true;
    }
  }

  validateImages(): boolean {
    if (this.images === null) {
      this.errors.images = "At least 1 image is required";
      return false;
    } else if (this.images.length > 12) {
      this.errors.images = "12 images maximum, please remove some"
      return false;
    } else {
      for (let i = 0; i < this.images.length; i++) {
        let im = this.images[i].file;
        if (im?.type !== "image/jpeg" && im?.type !== "image/png" && im?.type !== "image/webp") {
          this.errors.images = "Only PNG, JPG/JPEG, or WEBP image types allowed"
          return false;
        }
      }
      this.errors.images = "";
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
      this.errors.createListing = '';
      this.createListing();
    } else {
      if (!this.errors.createListing) {
        let invalid: string[] = []
        let msg = '';

        if (this.errors.title) invalid.push('title');
        if (this.errors.price) invalid.push('price');
        if (this.errors.description) invalid.push('description');
        if (this.errors.images) invalid.push('images');

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

        this.errors.createListing = `Please check your ${msg}`
      }
    }
  }

}
