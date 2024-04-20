import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FavoriteCharactersService } from './favorites.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CharacterApiService } from 'api/characters.api';
import { Character } from 'rickmortyapi';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <h1>Favorites</h1>
      <div class="character-list">
        <div class="row" *ngFor="let chunk of chunkedCharacters">
          <div class="col" *ngFor="let character of chunk">
            <mat-card class="character-card">
              <mat-card-header>
                <div mat-card-avatar class="example-header-image"></div>
                <mat-card-title>{{ character.name }}</mat-card-title>
                <mat-card-subtitle>Status: {{ character.status }}</mat-card-subtitle>
              </mat-card-header>
              <img mat-card-image [src]="character.image" alt="Character Image">
              <mat-card-content>
                <p>Species: {{ character.species }}</p>
                <!-- Add more details as needed -->
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['../../../styles.css']
})
export class FavoritesComponent {
  favoriteCharacters: Character[] = [];
  chunkedCharacters: any[] = [];

  constructor(private favoriteService: FavoriteCharactersService, private characterApiService: CharacterApiService) {}

  ngOnInit(): void {
    this.loadFavoriteCharacters();
  }

  loadFavoriteCharacters(): void {
    const favoriteIds = this.favoriteService.getFavoriteCharacters();
    if (favoriteIds.length === 0) {
      this.favoriteCharacters = [];
      this.chunkedCharacters = [];
      return;
    }
    this.characterApiService.getCharactersById(favoriteIds).then(response => {
      if (response && response.data && Array.isArray(response.data)) {
        this.favoriteCharacters = response.data.map((character: Character) => ({
          ...character,
          isFavorite: true
        }));
        this.chunkArray(this.favoriteCharacters, 3); // Chunk the favorite characters
      } else {
        console.error('Error loading favorite characters: Invalid response format');
      }
    }).catch(error => {
      console.error('Error loading favorite characters:', error);
    });
  }

  // Function to chunk characters into rows
  chunkArray(array: any[], chunkSize: number): void {
    this.chunkedCharacters = Array(Math.ceil(array.length / chunkSize))
      .fill(null)
      .map((_, index) => index * chunkSize)
      .map(begin => array.slice(begin, begin + chunkSize));
  }
}
