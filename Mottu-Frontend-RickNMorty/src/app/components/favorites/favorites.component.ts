import { Component, EventEmitter, Output } from '@angular/core';
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
import { NoFavoritesYet } from './noFavoritesYet';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NoFavoritesYet,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  template: `
    <header>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Poppins&display=swap" rel="stylesheet" />
    </header>
    <div class="container">
      <div class="character-list home-header">
        <h1 id="inicio" class="creepster-regular">Favoritos</h1>
      </div>
      <div id="size-display" class="character-list">
        <div class="row" *ngFor="let chunk of chunkedCharacters">
          <div class="col" *ngFor="let character of chunk">
            <mat-card *ngIf="character" class="character-card container">
              <img mat-card-image [src]="character.image" alt="Character Image" />
              <mat-card-content class="character-info">
                <h2 class="creepster-font-white">{{ character.name }}</h2>
                <p>Status: {{ character.status }}</p>
                <p>Species: {{ character.species }}</p>
                <button mat-button color="warn" (click)="removeFromFavorites(character.id)">Remove</button>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
    <app-no-favorites-yet *ngIf="chunkedCharacters.length === 0"></app-no-favorites-yet>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['../../../styles.css'],
})
export class FavoritesComponent {
  favoriteCharacters: Character[] = [];
  chunkedCharacters: any[] = [];
  @Output() favoritesChanged: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private favoriteService: FavoriteCharactersService,
    private characterApiService: CharacterApiService,
  ) {}

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
    this.characterApiService
      .getCharactersById(favoriteIds)
      .then((response) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.favoriteCharacters = response.data.map((character: Character) => ({
            ...character,
            isFavorite: true,
          }));
          this.chunkArray(this.favoriteCharacters, 3); // Chunk the favorite characters
        } else {
          console.error('Error loading favorite characters: Invalid response format');
        }
      })
      .catch((error) => {
        console.error('Error loading favorite characters:', error);
      });
  }
  removeFromFavorites(characterId: number) {
    this.favoriteService.removeFromFavorites(characterId);
    this.favoritesChanged.emit();
    this.ngOnInit(); // Emit event when favorites are changed
  }
  // Method to handle favorites changed event
  handleFavoritesChanged(): void {
    // Reload favorite characters when favorites are changed
    this.loadFavoriteCharacters();
  }
  // Function to chunk characters into rows
  chunkArray(array: any[], chunkSize: number): void {
    this.chunkedCharacters = Array(Math.ceil(array.length / chunkSize))
      .fill(null)
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  }
}
