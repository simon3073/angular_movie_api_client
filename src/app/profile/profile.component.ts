import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: User = {};
  FavMovies: any[] = [];
  showPreloader: Boolean = true;
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  async getUserData() {
    const userInfo = await lastValueFrom(this.fetchApiData.getUserDetails());
    this.showPreloader = false;
    this.userData = userInfo;
  }

  deleteMovie(movieTitle: string) {
    this.fetchApiData.removeMovieFromFavourites(movieTitle).subscribe(() => {
      this.snackBar.open('Movie deleted from your favourites', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['yellow-snackbar'],
      });
      this.getUserData();
    });
  }

  openWarningDialog(): void {
    this.dialog.open(WarningDialogComponent, {});
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      height: '550px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUserData();
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }
}

export interface User {
  Username?: string;
  Email?: any;
  Birthday?: any;
  FavouriteMovies?: [];
}
