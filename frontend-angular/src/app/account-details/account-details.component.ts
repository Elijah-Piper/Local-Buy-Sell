import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: any = {};
  profilePic: any = null;

  constructor(private accountService: AccountService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.populateAccountInfo();
  }

  populateAccountInfo() {
    this.accountService.getByJWT().subscribe((response) => {
      this.account = response;
      this.imageService.getProfilePicture(this.account.accountId).subscribe((r: any) => {
        let image = btoa(
          new Uint8Array(r.body)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        this.profilePic = `data:${r.headers.get('content-type').toLowerCase()};base64,${image}`;
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
