// favorite-characters.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCharactersService {
  private favorites: number[] = [];
  private readonly FAVORITES_KEY = 'favoriteCharacters';
  private favoritesSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  constructor() {
    this.syncFavoritesFromLocalStorage();
  }

  addToFavorites(characterId: number): void {
    const favorites = this.getFavoriteCharacters();
    if (!favorites.includes(characterId)) {
      favorites.push(characterId);
      this.updateFavorites(favorites);
    }
  }

  removeFromFavorites(characterId: number): void {
    const favorites = this.getFavoriteCharacters();
    const index = favorites.indexOf(characterId);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.updateFavorites(favorites);
    }
  }

  getFavoriteCharacters(): number[] {
    const favoritesString = localStorage.getItem(this.FAVORITES_KEY);
    return favoritesString ? JSON.parse(favoritesString) : [];
  }

  private updateFavorites(favorites: number[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  getFavoritesCount(): Observable<number> {
    return this.favoritesSubject.asObservable().pipe(map((favorites) => favorites.length));
  }
  private syncFavoritesFromLocalStorage(): void {
    const favorites = this.getFavoriteCharacters();
    this.favoritesSubject.next(favorites);
  }
}
