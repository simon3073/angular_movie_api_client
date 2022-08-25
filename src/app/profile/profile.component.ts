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

/*
  Component to show user data and user list of favourites
  User can update their profile, delete their account or remove movies from their favourites
*/
export class ProfileComponent implements OnInit {
  // set up data types
  userData: User = {};
  showPreloader: Boolean = true; // show preloader by default
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  // fetch user data << async for preloader
  async getUserData() {
    const userInfo = await lastValueFrom(this.fetchApiData.getUserDetails());
    this.showPreloader = false; // turn off preloader when loaded
    this.userData = userInfo;
  }

  // function to delete movie and display snackbar message
  deleteMovie(movieTitle: string): void {
    this.fetchApiData.removeMovieFromFavourites(movieTitle).subscribe(() => {
      this.snackBar.open('Movie deleted from your favourites', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['yellow-snackbar'],
      });
      this.getUserData(); // reload user data
    });
  }

  // function to confirm account deletion via dialog
  openWarningDialog(): void {
    this.dialog.open(WarningDialogComponent, {});
  }

  // function to open user edit dialog
  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      height: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUserData(); // reload data after close of dialog data
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }
}

// data type for user object
export interface User {
  Username?: string;
  Email?: string;
  Birthday?: string;
  FavouriteMovies?: [];
}
