import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  jwt = localStorage.getItem('jwt');

  constructor() {
    this.jwt = localStorage.getItem('jwt');
  }

  ngOnInit(): void {
    this.jwt = localStorage.getItem('jwt');
  }

  signOut() {
    localStorage.clear();
    location.reload();
  }

}
