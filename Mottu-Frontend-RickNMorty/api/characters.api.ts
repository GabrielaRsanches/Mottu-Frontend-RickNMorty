import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { getCharacters, getCharacter,  ApiResponse, Character, CharacterFilter, Info } from 'rickmortyapi'; // Import methods from rickmortyapi
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private favorites: number[] = [];
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}
    // Get characters from a specific page
    getCharactersFromPage(page: number = 1): Observable<any> {
      const url = `${this.apiUrl}/?page=${page}`;
      return this.http.get<ApiResponse<Character>>(url);
    }
  
  // Get all characters
  getAllCharacters(filters?: CharacterFilter): Promise<ApiResponse<Info<Character[]>>> {
    return getCharacters(filters);
  }

  // Search character by name
  searchCharacterByName(name: string): Promise<ApiResponse<Info<Character[]>>> {
    return getCharacters({ name });
  }

  // Get character information by id
  getCharacterById(id: number): Promise<ApiResponse<Character>> {
    return getCharacter(id);
  }

  // Get character information by id
  getCharactersById(id: number[]): Promise<ApiResponse<Character[]>> {
    return getCharacter(id);
  }

  // Add character to favorites
  addToFavorites(characterId: number): void {
    if (!this.favorites.includes(characterId)) {
      this.favorites.push(characterId);
    }
  }

  // Remove character from favorites
  removeFromFavorites(characterId: number): void {
    const index = this.favorites.indexOf(characterId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }
  
  // Get favorite characters
  getFavoriteCharacters(): Observable<Character[]> {
    // Assuming you have another method to retrieve favorite characters
    // For demo purpose, returning an empty array
    return new Observable<Character[]>(observer => {
      observer.next([]);
      observer.complete();
    });
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
}
