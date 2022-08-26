// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '80sMovies-Angular-client';
  currentRoute: boolean = true;
  username = localStorage.getItem('user');
  logo: string = './assets/img/site_logo_navbar.png';
  constructor(private router: Router) {}

  /**
   * Function to take user to the Profile page
   */
  goToProfile() {
    this.router.navigate(['profile']);
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
        console.log(
          '🚀 ~ file: app.component.ts ~ line 38 ~ AppComponent ~ this.router.events.subscribe ~ this.currentRoute',
          this.currentRoute,
          event.url
        );

        this.currentRoute =
          event.url !== '/register' &&
          event.url !== '/login' &&
          event.url !== '/';
        console.log(
          '🚀 ~ file: app.component.ts ~ line 38 ~ AppComponent ~ this.router.events.subscribe ~ this.currentRoute',
          this.currentRoute,
          event.url
        );
      }
    });
  }
}
