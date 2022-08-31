import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://movie-app-3073.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  genre: string = '';
  search: string = '';
  rating: boolean = false;
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * POST to an API endpoint  to login a user
   * @param userDetails - Object UserLogin which holds the username and password
   * @returns User object in JSON format
   */
  public userLogin(userDetails: UserLogin): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * POST to an API endpoint to create a new user account
   * @param userDetails - Object UserRegistration which holds the username, password, email and birthday
   * @returns User object in JSON format
   */
  public userRegistration(userDetails: UserRegistration): Observable<any> {
    return this.http
      .post(apiUrl + 'register', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * GET to an API endpoint to get all movies
   * @returns movies object in JSON format
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  // Making the api call for a specific movies data
  /**
   * GET to an API endpoint to get data on a specific movie
   * @param movieId - ID Number of the movie to get
   * @returns a movie object in JSON format
   */
  getMovieInfo(movieId: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movie/info/' + movieId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * GET to an API endpoint to get data on a director
   * @param director - String Name of the director
   * @returns a director object in JSON format
   */
  getDirectorInfo(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + director, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * GET to an API endpoint to get movies in a genre
   * @param genreName - String Name of the director
   * @returns a movies object in JSON format
   */
  getGenreInfo(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * GET to an API endpoint to get data on the logged in user
   * @returns User object in JSON format
   */
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'account/' + user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * PUT to an API endpoint to edit a user account
   * @param userDetails - Object UserRegistration which holds the username, password, email and birthday
   * @returns User object in JSON format
   */
  editUserDetails(userDetails: UserRegistration): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(
        apiUrl + 'account/' + user,
        {
          Username: userDetails.Username,
          Password: userDetails.Password,
          Email: userDetails.Email,
          Birthday: userDetails.Birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * DELETE to an API endpoint to delete the logged in users account
   * @returns confirmation string
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'account/' + user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * PUT to an API endpoint to add a movie to the users favourites list
   * @param movieTitle - String title of the movie
   * @returns Confirmation string
   */
  addMovieToFavourites(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(
        apiUrl + 'account/' + user + '/movies/' + movieTitle,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * DELETE to an API endpoint to remove a movie to the users favourites list
   * @param movieTitle - String title of the movie
   * @returns Confirmation string
   */
  removeMovieFromFavourites(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'account/' + user + '/movies/' + movieTitle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets the search term that has been entered in the navbar
   * This is used in the movie-view component to filter movies by their search
   * @returns search term string
   */
  getSearch(): string {
    return this.search;
  }

  /**
   * Sets the search term that has been entered in the navbar
   * This is used in the movie-card component to filter movies by their search
   * @param term - String of the search term
   */
  setSearch(term: string): void {
    this.search = term;
  }

  /**
   * Sets the genre term that has been selected in the movie view
   * This is used in the movie-card component to filter movies by their genre
   * @returns genre  string
   */
  getGenre(): string {
    return this.genre;
  }

  /**
   * Gets the genre term that has been selected in the movie view
   * This is used in the movie-card component to filter movies by their genre
   * @param genre - String title of the movie
   */
  setGenre(genre: string): void {
    this.genre = genre;
  }

  /**
   * Gets the rating boolean that has been set in the navbar selection drop-down
   * This is used in the movie-card component to filter movies by their rating (above 7)
   * @returns rating boolean
   */
  getRating(): boolean {
    return this.rating;
  }

  /**
   * Sets the rating boolean
   * This is used in the movie-card component to filter movies by their rating (above 7)
   * @param rating - boolean
   */
  setRating(rating: boolean): void {
    this.rating = rating;
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}`,
        +`Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// data type for user login
export interface UserLogin {
  Username: string;
  Password: string;
}

// data type for user login
export interface UserRegistration {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}
