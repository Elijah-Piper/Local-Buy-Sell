import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface userDetails {
  email: FormControl<string>,
  password: FormControl<string>, 
  showPass: FormControl<string>
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  title: string = 'Sign In';

  jwt: string = '';

  errors = {
    email: '',
    password: ''
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    showPass: new FormControl(false)
  })

  readonly ROOT_URL = "http://localhost:8080";
  posts: any;
  constructor(private http: HttpClient) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  get showPass() {
    return this.loginForm.get('showPass')?.value;
  }

  setFormControlAsInvalid(controlName: string): void {
    switch (controlName) {
      case 'email':
        this.loginForm.controls['email'].setErrors({'incorrect': true});
        break;
      case 'password':
        this.loginForm.controls['password'].setErrors({'incorrect': true});
    }
  }

  validateEmail(): boolean {
    if (this.email === null) {
      this.errors.email = "ERROR: The form control was return as null";
      this.setFormControlAsInvalid('email');
      return false;
    } else if (this.email.value === "") {
      this.errors.email = "Email is required";
      this.setFormControlAsInvalid('email');
      return false;
    } else if (!this.email.value?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.errors.email = "Email address not valid";
      this.setFormControlAsInvalid('email');
      return false;
    } else {
      this.errors.email = "";
      return true;
    }
  }

  validatePassword(): boolean {
    if (this.password === null) {
      this.errors.password = "ERROR: The form control was return as null";
      this.setFormControlAsInvalid('password');
      return false;
    } else if (this.password.value === "") {
      this.errors.password = "Password is required";
      this.setFormControlAsInvalid('password');
      return false;
    } else {
      this.errors.password = "";
      return true;
    }
  }

  validate(): boolean {
    let emailValid = this.validateEmail();
    let passwordValid = this.validatePassword();

    if (emailValid && passwordValid) {
      return true;
    } else {
      return false;
    }
  }


  generateToken() {
    console.log(`Email: ${this.email?.value}, Password: ${this.password?.value}`)

    let httpHeaders = new HttpHeaders().set('Authorization', `Basic ${btoa(this.email?.value + ':' + this.password?.value)}`)

    return this.http.post(this.ROOT_URL + '/token', {}, {
      headers: httpHeaders,
      responseType: 'text'
    }).subscribe((result: any) => {
        if (result.IsSuccess === false && result.ErrorMsg != null) {
          console.log(`Error Occurred: ${result.ErrorMsg}`);
        } else {
          localStorage.setItem('jwt', result);
          location.reload();
        }
      })
  }

  signIn() {
    this.generateToken();
  }

  onSubmit() {
    console.log(this.showPass);
    if (this.validate()) {
      this.signIn();
    }
  }

}
