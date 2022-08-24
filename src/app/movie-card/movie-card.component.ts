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
  userData: User[] = [];
  showPreloader: Boolean = true; // show preloader by default
  imdb_logo: string = './assets/img/imdb_logo.png'; //IMDB Logo to show rating

  constructor(public fetchApiData: FetchApiDataService) {}

  // on init, get logged in user data (to pass to movie view) and movie data via fetchApi component
  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
  }

  // fetch list of movies << async for preloader
  async getMovies() {
    const getMovieList = await lastValueFrom(this.fetchApiData.getAllMovies());
    this.showPreloader = false; // remove preloader
    this.movies = getMovieList; // assign movie data
  }

  // fetch user data
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
