import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from '../models/file-handle.model';
import { AccountService } from '../services/account.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  accountId: number;
  account: any = {};
  profilePicture: any = null;

  newProfilePicture: FileHandle;

  jwt = localStorage.getItem('jwt');

  readonly ROOT_URL = "http://localhost:8080";

  errors = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    contactMethod: '',
    profilePicture: '',
    editAccount: ''
  }

  editAccountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    contactMethod: new FormControl('', Validators.required)
  })

  constructor(
    private http: HttpClient, 
    private sanitizer: DomSanitizer, 
    private _activateRoute: ActivatedRoute, 
    private accountService: AccountService,
    private imageService: ImageService
    ) { }

  ngOnInit(): void {
    if (this.jwt && this.jwt !== 'exp') {
      this._activateRoute.params.subscribe(params => {
        this.accountId = params['accountId'];
        this.populateAccountInfo();
      })
    }
  }

  populateAccountInfo() {
    this.accountService.getByJWT().subscribe((response: any) => {
      this.account = response;
      this.imageService.getProfilePicture(this.account.accountId).subscribe((r: any) => {
        let image = btoa(
          new Uint8Array(r.body)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        this.profilePicture = `data:${r.headers.get('content-type').toLowerCase()};base64,${image}`;
      }, (e) => {
        console.log("\nERROR getting profile picture from DB");
        console.log(e);
      })
    }, (error) => {
      console.log("\nERROR getting account info from DB");
      console.log(error);
    });
  }

}
