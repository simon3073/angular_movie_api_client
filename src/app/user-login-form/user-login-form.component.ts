import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close();
        console.log(response.user.Username);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);
        this.snackBar.open('user logged in!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
    });
  }

  ngOnInit(): void {}
}
