// favorite-characters.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCharactersService {
  private favorites: number[] = [];
  private readonly FAVORITES_KEY = 'favoriteCharacters';
  constructor() {}

  addToFavorites(characterId: number): void {
    const favorites = this.getFavoriteCharacters();
    if (!favorites.includes(characterId)) {
      favorites.push(characterId);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(characterId: number): void {
    const index = this.favorites.indexOf(characterId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  getFavoriteCharacters(): number[] {
    const favoritesString = localStorage.getItem(this.FAVORITES_KEY);
    return favoritesString ? JSON.parse(favoritesString) : [];
  }
}

