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
  movieData = history.state.data;
  userData = history.state.user;
  showPreloader: Boolean = true;
  // movieData = {
  //   _id: 3,
  //   Title: 'Sixteen Candles',
  //   ReleaseYear: 1984,
  //   Director: [
  //     {
  //       _id: 3002,
  //       Born: '1950',
  //       Died: '2009',
  //       Name: 'John Hughes',
  //       Bio: 'John Hughes was an American film director, film producer, and screenwriter. He was credited for creating some of the most memorable comedy films of the 1980s and the 1990s, when he was at the height of his career. He had a talent for writing coming-of-age stories, and for depicting fairly realistic adolescent characters. ',
  //       MoviesDirected: [3, 4, 6, 8],
  //       imgURL:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUHhddxURhRcv8E77KsBchDIh8wUJGatTYGw&usqp=CAU',
  //     },
  //   ],
  //   Description:
  //     "A girl's 'sweet' sixteenth birthday becomes anything but special, as she suffers from every embarrassment possible.",
  //   imdbRating: 7,
  //   imgURL:
  //     'https://res.cloudinary.com/ds9nzjduw/image/upload/v1653892226/movie_api_client/16_candles_vi5i15.jpg',
  //   Genre: [
  //     {
  //       _id: 1001,
  //       Genre: 'Comedy',
  //     },
  //     {
  //       _id: 1002,
  //       Genre: 'Romance',
  //     },
  //   ],
  //   Actor: [
  //     {
  //       _id: 2005,
  //       Bio: 'Anthony Michael Hall was born in West Roxbury, Massachusetts. His parents are Mercedes Hall, an actress-blues and jazz singer, and Larry Hall, who owned an auto body shop. His stepfather is a show-business manager.',
  //       Born: '1968',
  //       Name: 'Anthony Michael Hall',
  //       imgURL:
  //         'https://m.media-amazon.com/images/M/MV5BOTdhZmJlMmUtZjdhYi00MDVjLWFhZmMtNTY4MDU5OWIyMTU5XkEyXkFqcGdeQXVyODUwMjgxNDU@._V1_.jpg',
  //       Movies: [3, 4, 6],
  //     },
  //     {
  //       _id: 2002,
  //       Bio: "Molly Ringwald was born in Roseville, California, to Adele Edith (Frembd), a chef, and Robert Ringwald, a blind jazz pianist. Her ancestry includes German, English, and Swedish. She released an album at the age of 6 entitled, 'I Wanna Be Loved By You, Molly Sings'. She is the youngest daughter of Bob Ringwald.",
  //       Born: '1968',
  //       Name: 'Molly Ringwald',
  //       imgURL:
  //         'https://m.media-amazon.com/images/M/MV5BMjM4MzM1NTkxNF5BMl5BanBnXkFtZTgwMzA4NTk3MjE@._V1_.jpg',
  //       Movies: [3, 4, 9],
  //     },
  //   ],
  //   imgURL_load:
  //     'https://res.cloudinary.com/ds9nzjduw/image/upload/e_blur:1500,q_10/v1653892226/movie_api_client/16_candles_vi5i15.jpg',
  //   imgURL_thumb:
  //     'https://res.cloudinary.com/ds9nzjduw/image/upload/c_scale,h_150,q_30,w_100/v1653892226/movie_api_client/16_candles_vi5i15.jpg',
  // };
  imdb_logo: string = './assets/img/imdb_logo.png';

  genres: any = [];
  actors: any = [];
  faveChecked = false;
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  toggleFavChanged(movieTitle: string) {
    if (this.faveChecked) {
      this.fetchApiData.addMovieToFavourites(movieTitle).subscribe(() => {
        console.log('Movie added from favourites');
      });
    } else {
      this.fetchApiData.removeMovieFromFavourites(movieTitle).subscribe(() => {
        console.log('Movie Removed from favourites');
      });
    }
  }

  openDialog(dialogData: any) {
    this.dialog.open(BioDialogComponent, {
      width: '50%',
      data: {
        dialogData,
      },
    });
  }

  setUpPage(): void {
    this.genres = this.movieData.Genre;
    this.actors = this.movieData.Actor;
    this.faveChecked = this.userData.FavouriteMovies.find((m: any) =>
      m.Title === this.movieData.Title ? true : false
    );
    this.showPreloader = false;
  }

  ngOnInit(): void {
    // set faveChecked based on data
    if (!this.movieData) {
      console.log('a');
      this.router.navigate(['movies']);
    } else {
      this.setUpPage();
    }
  }
}
