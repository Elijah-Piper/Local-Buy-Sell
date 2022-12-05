import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-angular';

  sessionExpired() {
    if (confirm("Your session has expired, please sign back in.")) {
      localStorage.setItem('jwt', '');
      location.reload();
    }
  }
  
  getJwt() {
    return localStorage.getItem('jwt');
  }
}
