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

/*
  Component to show information of a single movie - 
  Client can select to view more information of director or actor, or add to favourites
*/
export class MovieViewComponent implements OnInit {
  // collect data passed by the routerLink
  movieData = history.state.data;
  userData = history.state.user;

  // retrieve IMDB logo
  imdb_logo: string = './assets/img/imdb_logo.png';

  // set up data types
  genres: GenreData[] = [];
  actors: ActorData[] = [];
  showPreloader: Boolean = true;
  faveChecked = false; // set favourite toggle to false by default

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  // function fired when user toggles favourite
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

  // open the BioDialogComponent and pass the data parameter
  openDialog(dialogData: DialogData): void {
    this.dialog.open(BioDialogComponent, {
      width: '50%',
      data: {
        dialogData,
      },
    });
  }

  // set up the page if we have a token and user in the history state
  setUpPage(): void {
    this.genres = this.movieData.Genre;
    this.actors = this.movieData.Actor;
    this.faveChecked = this.userData.FavouriteMovies.find((m: any) =>
      m.Title === this.movieData.Title ? true : false
    );
    this.showPreloader = false;
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
