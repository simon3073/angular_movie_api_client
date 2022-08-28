import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

/*
  Component to show list of movies in db - to which client can select to view more information and add to favourites
*/
export class MovieCardComponent implements OnInit {
  // set up data types
  movies: any[] = [];
  filteredMovies: any[] = [];
  userData: User[] = [];
  genre?: string = history.state.genre;
  showPreloader: Boolean = true; // show preloader by default
  imdb_logo: string = './assets/img/imdb_logo.png'; //IMDB Logo to show rating

  constructor(public fetchApiData: FetchApiDataService) {}

  // on init, get logged in user data (to pass to movie view) and movie data via fetchApi component
  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
  }

  /**
   * This is the function responsible getting the data for all the movies.
   * Calls fetchApiData.getAllMovies()
   * Saves data in movies array
   * @see {@link fetchApiData}
   * @see {@link movies}
   * @returns Movie object
   * @throws response.error
   */
  async getMovies() {
    const getMovieList = await lastValueFrom(this.fetchApiData.getAllMovies());
    this.showPreloader = false; // remove preloader
    this.movies = getMovieList; // assign movie data
    // if we have been served a genre - filter the movies to show only movies form that genre
    if (this.genre !== undefined) {
      this.filteredMovies = this.movies.filter((m) =>
        m.Genre.some((g: any) => g.Genre === this.genre)
      );
      this.movies = this.filteredMovies;
    }
  }

  /**
   * This is the function responsible getting the data of the logged in user
   * Calls fetchApiData.getUserDetails()
   * Saves data in userData array using the User interface
   * @see {@link fetchApiData}
   * @see {@link userData}
   * @see {@link User}
   * @returns user object
   * @throws response.error
   */
  getUserData(): void {
    this.fetchApiData.getUserDetails().subscribe((resp: any) => {
      this.userData = resp; // assign user data
    });
  }
}

export interface User {
  Username: string;
  Email: string;
  Birthday: string;
  FavouriteMovies: [];
}
