import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BioDialogComponent } from '../bio-dialog/bio-dialog.component';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {
  /**
   * movieData receives its data from the routerLink in the MovieCard template when a movie is selected
   */
  movieData = history.state.data;
  /**
   * userData receives its data from the routerLink in the MovieCard template when a movie is selected
   */
  userData = history.state.user;

  // retrieve IMDB logo
  imdb_logo: string = './assets/img/imdb_logo.png';

  /**
   *
   */
  genres: GenreData[] = [];
  actors: ActorData[] = [];
  showPreloader: Boolean = true;
  faveChecked = false; // set favourite toggle to false by default

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /**
   * This is the function responsible adding a movie to the logged in users favourites
   * Calls fetchApiData.getUserDetails()
   * @remarks Called when user toggles favourite
   * @param movieTitle - string of the current movie to display in the label
   * @see {@link fetchApiData}
   */
  toggleFavChanged(movieTitle: string): void {
    if (this.faveChecked) {
      // if checked, add this movie to user favourites
      this.fetchApiData.addMovieToFavourites(movieTitle).subscribe(() => {});
    } else {
      // if unchecked - remove it
      this.fetchApiData
        .removeMovieFromFavourites(movieTitle)
        .subscribe(() => {});
    }
  }

  /**
   * This is the function responsible adding a movie to the logged in users favourites
   * Calls fetchApiData.getUserDetails()
   * @remarks Opens the BioDialogComponent as a dialog and pass the data as an object
   * @param DialogData - Object of data to pass to BioDialogComponent for
   * @see {@link DialogData}
   */
  openDialog(dialogData: DialogData): void {
    this.dialog.open(BioDialogComponent, {
      data: {
        dialogData,
      },
    });
  }

  /**
   * Function to set up variables for the template to display
   * @remarks Only called if we have been passed data, otherwise re-route to /movies
   * @see {@link genres}
   * @see {@link actors}
   * @see {@link faveChecked}
   */
  setUpPage(): void {
    this.genres = this.movieData.Genre;
    this.actors = this.movieData.Actor;
    this.faveChecked = this.userData.FavouriteMovies.find((m: any) =>
      m.Title === this.movieData.Title ? true : false
    );
    this.showPreloader = false;
  }

  // Set Genre in fetchAPI service and route back to movies
  seeGenreMovies(genre: string): void {
    this.fetchApiData.setGenre(genre);
    this.fetchApiData.setRating(false);
    this.fetchApiData.setSearch('');
    this.router.navigate(['movies']);
  }

  ngOnInit(): void {
    if (!this.movieData) {
      // if we havent been passed data (on page refresh) route to main movie page
      this.router.navigate(['movies']);
    } else {
      this.setUpPage();
    }
  }
}

// data type for dialog data object
export interface DialogData {
  _id: number;
  Bio: string;
  Born: string;
  Died?: string;
  Name: string;
  imgURL: string;
  MoviesDirected?: number[];
  Movies?: number[];
}

// data type for dialog data object
export interface GenreData {
  _id: number;
  Genre: string;
}

// data type for the actor data object
export interface ActorData {
  _id: number;
  Bio: string;
  Born: string;
  Died?: string;
  Name: string;
  imgURL: string;
  Movies: number[];
}
