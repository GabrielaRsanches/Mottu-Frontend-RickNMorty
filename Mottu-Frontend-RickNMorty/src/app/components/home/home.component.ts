import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiResponse, Character } from 'rickmortyapi';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteCharactersService } from 'src/app/components/favorites/favorites.service';
import { CharacterApiService } from 'api/characters.api';
import { NoResultsFoundComponent } from '../no-results-found/no-results-found.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../styles.css'],
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    RouterOutlet,
    NoResultsFoundComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [CharacterApiService, HttpClientModule],
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  chunkedCharacters: Character[][] = [];
  filteredCharacters: Character[] = [];
  favorites: number[] = [];

  constructor(
    @Inject(CharacterApiService) private characterApiService: CharacterApiService,
    private favoriteService: FavoriteCharactersService,
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1): void {
    this.characterApiService
      .getAllCharacters({ page })
      .then((response) => {
        if (response && response.data && response.data.results) {
          this.characters = response.data.results.map((character: Character) => ({
            ...character,
            isFavorite: this.favoriteService.getFavoriteCharacters().includes(character.id),
          }));
          this.filteredCharacters = this.characters;
          this.totalPages = response.data.info?.pages ?? 0;
          this.currentPage = page;
          this.chunkArray(this.filteredCharacters, 3);
        } else {
          console.error('Error loading characters: Invalid response format');
        }
      })
      .catch((error) => {
        console.error('Error loading characters:', error);
      });
  }

  updateFavoriteCharacters(): void {
    // Filter the characters array to only include characters that are favorites
    this.filteredCharacters = this.characters.filter((character) => this.isFavorite(character));
    // Recalculate chunkedCharacters based on the updated filteredCharacters
    this.chunkArray(this.filteredCharacters, 3);
  }

  addToFavorites(character: Character): void {
    this.favoriteService.addToFavorites(character.id);
  }

  removeFromFavorites(character: Character): void {
    this.favoriteService.removeFromFavorites(character.id);
  }

  isFavorite(character: Character): boolean {
    return this.favoriteService.getFavoriteCharacters().includes(character.id);
  }

  toggleFavorite(character: Character): void {
    if (this.isFavorite(character)) {
      this.removeFromFavorites(character);
    } else {
      this.addToFavorites(character);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadCharacters(page);
    }
  }
  searchCharacters(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredCharacters = this.characters.filter((character) =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    } else {
      this.filteredCharacters = this.characters;
    }

    this.chunkArray(this.filteredCharacters, 3);
  }

  chunkArray(array: any[], chunkSize: number): void {
    this.chunkedCharacters = Array(Math.ceil(array.length / chunkSize))
      .fill(null)
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  }
}
