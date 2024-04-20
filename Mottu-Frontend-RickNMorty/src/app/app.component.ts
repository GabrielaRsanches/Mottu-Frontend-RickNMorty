import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterApiService } from 'api/characters.api';
import { HttpClientModule } from '@angular/common/http';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoriteCharactersService } from './components/favorites/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, CommonModule, HeaderComponent, HomeComponent, HttpClientModule, FavoritesComponent],
  template: `
  <app-header></app-header>
    <router-outlet></router-outlet>`,
  styleUrls: ['../styles.css'],
  providers: [CharacterApiService, FavoriteCharactersService],
  standalone: true
})
export class AppComponent {
  isViewingFavorites: boolean = false;
  
  toggleFavorites(): void {
   
  }
}
