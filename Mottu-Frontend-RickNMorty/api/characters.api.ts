import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CharacterApiResponse {
  info: {
    pages: number;
  };
  results: any[];
}

@Injectable({
  providedIn: 'any',
})
export class CharacterApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private favorites: number[] = [];

  constructor(private http: HttpClient) {}

  // Get all characters or search by name
  getCharacters(name?: string): Observable<any[]> {
    let url = this.apiUrl;
    if (name) {
      url += `?name=${name}`;
    }
    return this.http.get<any>(url).pipe(
      map(response => response.results),
      catchError(error => {
        throw 'Error in getting characters: ' + error;
      })
    );
  }
  // Get characters from a specific page
  getCharactersFromPage(page: number = 1): Observable<CharacterApiResponse> {
    const url = `${this.apiUrl}/?page=${page}`;
    return this.http.get<CharacterApiResponse>(url);
  }

   // Get total count of characters
   getTotalCountOfCharacters(): Observable<number> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.info.count),
      catchError(error => {
        throw 'Error in getting total count of characters: ' + error;
      })
    );
  }

  // Get total number of pages
  getTotalPages(): Observable<number> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.info.pages),
      catchError(error => {
        throw 'Error in getting total number of pages: ' + error;
      })
    );
  }

  // Add character to favorites
  addToFavorites(characterId: number): Observable<any> {
    if (!this.favorites.includes(characterId)) {
      this.favorites.push(characterId);
    }
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  // Remove character from favorites
  removeFromFavorites(characterId: number): Observable<any> {
    const index = this.favorites.indexOf(characterId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  // Get favorite characters
  getFavoriteCharacters(): Observable<any[]> {
    // Assuming you have another API endpoint to retrieve favorite characters
    // For demo purpose, returning an empty array
    return new Observable(observer => {
      observer.next([]);
      observer.complete();
    });
  }
}
