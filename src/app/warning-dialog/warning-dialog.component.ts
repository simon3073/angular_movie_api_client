import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss'],
})
/*
  Component used as a dialog for confirming deletion of account
*/
export class WarningDialogComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * This is the function responsible for deleting the current users account.
   * Calls fetchApiData.deleteUser.
   * On success removes data from localStorage
   * then routes to /login.
   * @remarks Displays feedback in snackbar
   * @see {@link fetchApiData}
   * @see {@link snackBar}
   * @returns User object
   * @throws response.error
   */
  deleteAccount(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {});
    localStorage.clear();
    this.router.navigate(['/login']);
    this.snackBar.open('You have successfully deleted your account!', 'OK', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['yellow-snackbar'],
    });
  }

  ngOnInit(): void {}
}
