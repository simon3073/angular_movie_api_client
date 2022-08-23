import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss'],
})
export class WarningDialogComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  deleteAccount(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
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
