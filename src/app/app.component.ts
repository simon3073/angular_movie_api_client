// src/app/app.component.ts
import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { map, Observable, startWith, lastValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FetchApiDataService } from './fetch-api-data.service';

export interface Movies {
  [key: string]: any;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '80sMovies-Angular-client';
  currentRoute: string = '';
  showNav: boolean = true;
  username = localStorage.getItem('user');
  logo: string = './assets/img/site_logo_navbar.png';
  movies: Movies[] = [];

  searchForm = new FormControl<string | Movies>('');
  searchOptions: Observable<Movies[]>;
  @Input() movieTitle = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /**
   * Function to take user to the Profile page
   */
  goToProfile() {
    this.router.navigate(['profile']);
  }

  /** This is the function responsible getting the data for all the movies.
   * Calls fetchApiData.getAllMovies()
   * Saves data in movies array
   * @see {@link fetchApiData}
   * @see {@link movies}
   * @returns Movie object
   * @throws response.error
   */
  async getMovies() {
    const getMovieList = await lastValueFrom(this.fetchApiData.getAllMovies());
    this.movies = getMovieList.map((m: any) => m.Title); // assign movie data
  }

  /** Called when the user presses enter or selects a autocomplete suggestion in the searchbar
   * Calls fetchApiData to set search and reset rating, genre to empty()
   * reloads the route to movies to display filtered by search
   * @see {@link fetchApiData}
   */
  searchForMovie(): void {
    this.fetchApiData.setSearch(this.movieTitle);
    this.fetchApiData.setRating(false);
    this.fetchApiData.setGenre('');
    this.currentRoute === '/movies'
      ? this.reloadComponent()
      : this.router.navigate(['movies']);
  }

  /** Called when the user selects rating option in the navbar
   * Calls fetchApiData to set rating and reset search, genre to empty()
   * reloads the route to movies to display filtered by rating number
   * @param rating boolean
   * @see {@link fetchApiData}
   */
  setRating(rating: boolean): void {
    this.fetchApiData.setRating(rating);
    this.fetchApiData.setSearch('');
    this.fetchApiData.setGenre('');
    this.currentRoute === '/movies'
      ? this.reloadComponent()
      : this.router.navigate(['movies']);
  }

  /** Called by setRating() or searchForMovie() when the page needs to be reloaded
   */
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  /** Called by the search options observer
   * filters the title parameter and returns updated list for display in autocomplete search list
   * @param title string
   * @returns movies array
   */
  private _filter(title: string): Movies[] {
    const filterValue = title.toLowerCase();
    return this.movies.filter((m) => m.toLowerCase().includes(filterValue));
  }

  /**
   * Function to log user out
   * @remarks removes localStorage and route to /login
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
      this.showNav =
        this.currentRoute !== '/register' &&
        this.currentRoute !== '/login' &&
        this.currentRoute !== '/';
    });
    this.getMovies();
    this.searchOptions = this.searchForm.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const title = typeof value === 'string' ? value : value?.title;
        return title ? this._filter(title as string) : this.movies.slice();
      })
    );
  }
}
