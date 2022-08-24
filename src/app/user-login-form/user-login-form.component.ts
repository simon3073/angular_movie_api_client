import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

/*
  Component to login to app
*/
export class UserLoginFormComponent implements OnInit {
  // set up data types
  @Input() userData = { Username: '', Password: '' };
  logo: string = './assets/img/site_logo.png';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (response) => {
        this.snackBar.open('user logged in!', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['yellow-snackbar'],
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);
        this.router.navigate(['movies']);
      },
      error: (response) => {
        this.snackBar.open('Invalid Username or Password', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['yellow-snackbar'],
        });
      },
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['movies']);
    }
  }
}
