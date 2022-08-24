import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
/*
  Component to register a new account for the app
*/
export class UserRegistrationFormComponent implements OnInit {
  // set up data types
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  logo: string = './assets/img/site_logo.png';
  momentDate: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // validate user input prior to updating data
  validate(): boolean {
    let isReq = true;
    if (!this.userData.Username || this.userData.Username.length < 4) {
      isReq = false;
    }
    // check password existence and length
    if (!this.userData.Password || this.userData.Password.length < 6) {
      isReq = false;
    }
    // check email existence and format
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.userData.Email || !this.userData.Email.match(mailFormat)) {
      isReq = false;
    }
    // check birthday existence
    if (!this.userData.Birthday) {
      isReq = false;
    }
    return isReq;
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    // turn on preloader, convert datePicker to date format and validate inputs
    this.momentDate = moment(this.userData.Birthday).format();
    this.userData.Birthday = this.momentDate;
    if (this.validate()) {
      // if inputs valid update
      this.fetchApiData.userRegistration(this.userData).subscribe({
        next: (response) => {
          this.snackBar.open('Account created! Welcome to 80s Movies!', 'OK', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: ['yellow-snackbar'],
          });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', response.user.Username);
          this.router.navigate(['movies']);
        },
        error: (response) => {
          this.snackBar.open(
            'We cannot create your account. Please review each required field.',
            'OK',
            {
              verticalPosition: 'top',
              panelClass: ['yellow-snackbar'],
              duration: 4000,
            }
          );
        },
      });
    } else {
      this.snackBar.open(
        'We cannot create your account. Please review each required field.',
        'OK',
        {
          verticalPosition: 'top',
          panelClass: ['yellow-snackbar'],
          duration: 4000,
        }
      );
    }
  }

  ngOnInit(): void {}
}
