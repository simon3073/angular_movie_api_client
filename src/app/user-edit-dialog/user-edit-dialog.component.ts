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
    // check birthday existence and format
    if (!this.userData.Birthday) {
      isReq = false;
    }
    return isReq;
  }

  // fetch user data << async for preloader
  async getUserData() {
    const userInfo = await lastValueFrom(this.fetchApiData.getUserDetails());
    this.showPreloader = false; // turn off preloader when loaded
    this.userData = userInfo;
  }

  // function for updating user data
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
