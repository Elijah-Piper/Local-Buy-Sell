import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from '../models/account.model';
import { FileHandle } from '../models/file-handle.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  title: string = 'Sign Up';

  errors = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    contactMethod: '',
    profilePicture: '',
    signUp: ''
  }

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    contactMethod: new FormControl('', Validators.required),
    showPass: new FormControl(false)
  })

  profilePicture: FileHandle;

  passwordStrength = {
    perc: 0,
    color: "red"
  }

  readonly ROOT_URL = "http://localhost:8080";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
  }

  get contactMethod() {
    console.log('Contact Method: ' + this.signUpForm.get('contactMethod')?.value);
    return this.signUpForm.get('contactMethod');
  }

  get showPass() {
    return this.signUpForm.get('showPass')?.value;
  }

  ngOnInit(): void {
    this.updatePasswordStrength();
  }

  handlePictureInput(target: any) {
    let files = (target as HTMLInputElement).files;
    if (files) {
      const f = files[0];
      const fileHandle: FileHandle = {
        file: f,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(f)
        )
      }
      this.profilePicture = fileHandle;
    }
  }

  updatePasswordStrength() {
    this.password?.valueChanges.subscribe(pass => {
      this.passwordStrength.perc = 0;
      this.passwordStrength.color = 'red';
      if (pass === null || pass?.length === 0) {
        return;
      }

      if (pass.length < 16) {
        this.passwordStrength.perc = pass.length * 4;
      } else {
        this.passwordStrength.perc = 64;
      }

      if (pass.match('[A-Z]')) {
        this.passwordStrength.perc += 9;
      }

      if (pass.match('[a-z]')) {
        this.passwordStrength.perc += 9;
      }

      if (pass.match('[0-9]')) {
        this.passwordStrength.perc += 9;
      }

      if (pass.match('[!@#]')) {
        this.passwordStrength.perc += 9;
      }

      if (this.passwordStrength.perc <= 25) {
        this.passwordStrength.color = 'red';
      } else if (this.passwordStrength.perc <= 50) {
        this.passwordStrength.color = 'orange';
      } else if (this.passwordStrength.perc <= 75) {
        this.passwordStrength.color = 'yellow';
      } else {
        this.passwordStrength.color = 'green';
      }
    })
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  createAccount() {
    let account = {}

    if (this.phoneNumber?.value !== '') {
      account = {
        email: this.email?.value,
        phoneNumber: this.phoneNumber?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        password: this.password?.value
      }
    } else {
      account = {
        email: this.email?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        password: this.password?.value
      }
    }
    

    this.http.post(this.ROOT_URL + '/account/create', account).subscribe((response: any) => {
      console.log("Account creation successful");
      
      this.setProfilePicture(response.accountId);
    }, (error) => {
      console.log("HTTP ERROR:");
      console.log(error);
    })
  }

  setProfilePicture(accountId: number) {
    let httpHeaders = new HttpHeaders().set('Authorization', `Basic ${btoa(this.email?.value + ':' + this.password?.value)}`);
    let httpBody = new FormData();
    httpBody.append('image', this.profilePicture.file, this.profilePicture.file.name);
    httpBody.append('reportProgress', 'true');

    this.http.post(this.ROOT_URL + `/image/createprofilepicture/${accountId}`, httpBody, {
      headers: httpHeaders
    }).subscribe((response: any) => {
      console.log("Profile Picture Successfully Set!!!");
    }, (error) => {
      console.log("HTTP ERROR SETTING PROFILE PICTURE:");
      console.log(error);
    })
  }

  validateEmail(): boolean {
    if (this.email === null) {
      this.errors.email = "ERROR: The form control was returned as null";
      return false;
    } else if (this.email.value === "") {
      this.errors.email = "Email is required";
      return false;
    } else if (!this.email.value?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.errors.email = "Email address not valid";
      return false;
    } else {
      this.errors.email = "";
      return true;
    }
  }

  validatePhoneNumber(): boolean {
    if (this.phoneNumber === null) {
      this.errors.phoneNumber = "ERROR: The form control was returned as null";
      return false;
    } else if (this.phoneNumber.value === '') {
      this.errors.phoneNumber = '';
      return true;
    } else if ((! this.phoneNumber.value?.match('^[0-9]+$'))) {
      this.errors.phoneNumber = "Cannot contain anything but numbers"
      return false;
    } else if (this.phoneNumber.value.length > 0 && (this.phoneNumber.value.length < 10 || this.phoneNumber.value.length > 10)) {
      this.errors.phoneNumber = "Must be exactly 10 characters long";
      return false;
    } else {
      this.errors.phoneNumber = '';
      return true;
    }
  }

  validateContactMethod(): boolean {
    if (this.contactMethod === null) {
      this.errors.contactMethod = "ERROR: The form control was returned as null";
      return false;
    } else if (this.contactMethod.value === '') {
      this.errors.contactMethod = "Preferred contact method is required";
      return false;
    } else if ((this.contactMethod.value === 'text' || this.contactMethod.value === 'call') && this.phoneNumber?.value === '') {
      this.errors.contactMethod = "A phone number is required if your preferred contact method is call or text";
      return false;
    } else {
      this.errors.contactMethod = '';
      return true;
    }
  }

  validateFirstName(): boolean {
    if (this.firstName === null) {
      this.errors.firstName = "ERROR: The form control was returned as null";
      return false;
    } else if (! this.firstName.value) {
      this.errors.firstName = "First name is required";
      return false;
    } else if (this.firstName.value.length < 2 || this.firstName.value.length > 50) {
      this.errors.firstName = "2-50 letters allowed";
      return false;
    } else if (! this.firstName.value.match('^[a-zA-Z\'-`]+$')) {
      this.errors.firstName = "Only letters allowed";
      return false;
    } else {
      this.errors.firstName = '';
      return true;
    }
  }

  validateLastName(): boolean {
    if (this.lastName === null) {
      this.errors.lastName = "ERROR: The form control was returned as null";
      return false;
    } else if (! this.lastName.value) {
      this.errors.lastName = "Last name is required";
      return false;
    } else if (this.lastName.value.length < 2 || this.lastName.value.length > 50) {
      this.errors.lastName = "2-50 letters allowed";
      return false;
    } else if (! this.lastName.value.match('^[a-zA-Z\'-`]+$')) {
      this.errors.lastName = "Only letters allowed";
      return false;
    } else {
      this.errors.lastName = '';
      return true;
    }
  }

  validatePassword(): boolean {
    if (this.password === null) {
      this.errors.password = "ERROR: The form control was returned as null";
      return false;
    } else if (this.password.value === "") {
      this.errors.password = "Password is required";
      return false;
    } else {
      this.errors.password = "";
      return true;
    }
  }

  validateConfirmPassword(): boolean {
    if (this.confirmPassword === null) {
      this.errors.confirmPassword = "ERROR: The form control was returned as null";
      return false;
    } else if (this.confirmPassword.value === '') {
      this.errors.confirmPassword = "Confirm your password";
      return false;
    } else if (this.confirmPassword.value !== this.password?.value) {
      this.errors.confirmPassword = "Your password do not match";
      return false;
    } else {
      this.errors.confirmPassword = '';
      return true;
    }
  }

  validateProfilePicture(): boolean {
    if (! this.profilePicture) {
      this.errors.profilePicture = "A profile picture is required";
      return false;
    } else {
      this.errors.profilePicture = '';
      return true;
    }
  }

  validate(): boolean {
    let emailValid = this.validateEmail();
    let phoneNumberValid = this.validatePhoneNumber();
    let contactMethodValid = this.validateContactMethod();
    let firstNameValid = this.validateFirstName();
    let lastNameValid = this.validateLastName();
    let passwordValid = this.validatePassword();
    let confirmPasswordValid = this.validateConfirmPassword();
    let profilePictureValid = this.validateProfilePicture();

    if (emailValid && phoneNumberValid && contactMethodValid && firstNameValid && lastNameValid && passwordValid && confirmPasswordValid && profilePictureValid) {
      this.errors.signUp = '';
      return true;
    } else {
      this.errors.signUp = "One or more of your fields are invalid";
      return false;
    }
  }

  onSubmit() {
    if (this.validate()) {
      this.createAccount();
    } else {
      console.log("Validation Failure");
    }
  }

}
