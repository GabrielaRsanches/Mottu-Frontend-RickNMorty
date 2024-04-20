import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { CharacterApiService } from 'api/characters.api';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { FavoritesComponent } from './app/components/favorites/favorites.component';
// index.js


bootstrapApplication(AppComponent, {
  providers: [
    CharacterApiService,
    provideRouter([{ path: '', component: HomeComponent },
    { path: 'favorites', component: FavoritesComponent }])
    // ...
  ]
})
  .catch(err => console.error(err));
