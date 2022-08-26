import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})

/*
  Component to edit user data 
*/
export class UserEditDialogComponent implements OnInit {
  // set up data types
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  momentDate: string = '';
  showPreloader: Boolean = true;
  constructor(
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    private dialogRef: MatDialogRef<UserEditDialogComponent>
  ) {}

  /**
   * Function to validate user input prior to updating data
   * Displays feedback in snackbar
   * @returns Boolean
   */
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
    // check birthday existence and format
    if (!this.userData.Birthday) {
      isReq = false;
    }
    return isReq;
  }

  /**
   * This is the function responsible getting the data of the logged in user
   * Calls fetchApiData.getUserDetails()
   * Saves data in userData array using the User interface
   * @see {@link fetchApiData}
   * @see {@link userData}
   * @see {@link User}
   * @returns userInfo object
   * @throws response.error
   */
  async getUserData() {
    const userInfo = await lastValueFrom(this.fetchApiData.getUserDetails());
    this.showPreloader = false; // turn off preloader when loaded
    this.userData = userInfo;
  }

  /**
   * This is the function responsible for sending the form inputs to the backend to register a new user account.
   * Calls fetchApiData.editUserDetails.
   * On success updates returned username and token to localStorage
   * then closes this component
   * @remarks Displays feedback in snackbar
   * @see {@link fetchApiData}
   * @see {@link User}
   * @see {@link snackBar}
   * @returns User object
   * @throws response.error
   */
  async updateUserData() {
    // turn on preloader, convert datePicker to date format and validate inputs
    this.showPreloader = true;
    this.momentDate = moment(this.userData.Birthday).format();
    if (this.validate()) {
      // if inputs valid update
      try {
        const update = this.fetchApiData.editUserDetails(this.userData);
        await lastValueFrom(update);
        localStorage.setItem('user', this.userData.Username);
        alert('Your Account has been updated');
        this.dialogRef.close();
      } catch (error) {
        this.dialogRef.close();
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
    } else {
      this.showPreloader = false;
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

  ngOnInit(): void {
    this.getUserData();
  }
}

export interface User {
  Username?: string;
  Email?: String;
  Birthday?: String;
  Password?: String;
}
