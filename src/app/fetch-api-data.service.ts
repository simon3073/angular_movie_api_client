import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://movie-app-3073.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'register', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for all the movie data
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
  getMovieInfo(movieId: number): Observable<any> {
    console.log(movieId);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movie/info/' + movieId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  // Making the api call for a directors bio
  getDirectorInfo(director: string): Observable<any> {
    console.log(director);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + director, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  // Making the api call for genre info
  getGenreInfo(genreName: string): Observable<any> {
    console.log(genreName);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  // Making the api call for a users account details
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(apiUrl + 'account/' + user);
    return this.http
      .get(apiUrl + 'account/' + user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  // Making the api call for editing a users details
  editUserDetails(userDetails: any): Observable<any> {
    console.log('editUserDetails', userDetails);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(apiUrl + 'account/' + user);
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

  // Making the api call for deleting a users details
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

  // Making the api call to add a movie to a users Favourites
  addMovieToFavourites(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(apiUrl + 'account/' + user + '/movies/' + movieTitle);
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

  // Making the api call to add a movie to a users Favourites
  removeMovieFromFavourites(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(apiUrl + 'account/' + user + '/movies/' + movieTitle);
    return this.http
      .delete(apiUrl + 'account/' + user + '/movies/' + movieTitle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(catchError(this.handleError));
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
