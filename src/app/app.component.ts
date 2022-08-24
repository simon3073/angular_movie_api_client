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

  goToProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url !== '/register' && event.url !== '/login';
      }
    });
  }
}
