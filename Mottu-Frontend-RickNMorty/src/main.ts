import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { CharacterApiService } from 'api/characters.api';
// index.js


bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
