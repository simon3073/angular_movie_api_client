import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  userData: any[] = [];
  showPreloader: Boolean = true;
  imdb_logo: string = './assets/img/imdb_logo.png';
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
  }

  async getMovies() {
    const getMovieList = await lastValueFrom(this.fetchApiData.getAllMovies());
    this.showPreloader = false;
    this.movies = getMovieList;
  }

  getUserData(): void {
    this.fetchApiData.getUserDetails().subscribe((resp: any) => {
      this.userData = resp;
      return this.userData;
    });
  }
}
