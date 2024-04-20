import { Component, EventEmitter, Inject, inject, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbar, MatToolbarModule, MatToolbarRow} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-header',
  template: `
  <head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <script type="importmap">
    {
      "imports": {
        "@material/web/": "https://esm.run/@material/web/"
      }
    }
  </script>
  <script type="module">
    import '@material/web/all.js';
    import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';

    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  </script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="../../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
  </head>
  <mat-toolbar style="width:100%, weight:100%">
      <span>My App</span>
      <button style="padding: 1em;" mat-icon-button (click)="navigateToHome()" class="example-icon home-icon" aria-label="Example icon-button with home icon">
        <mat-icon fontIcon="home"></mat-icon>
      </button>
      <span class="example-spacer"></span>

            <button style="padding: 1em;" mat-icon-button (click)="navigateToFavorites()" class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
              <mat-icon fontIcon="favorites"></mat-icon>
            </button>

    </mat-toolbar>
<router-outlet></router-outlet>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular/material/toolbar"></script>

  `,
  styleUrls: ['../../../styles.css'],
  imports: [ FavoritesComponent, RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, CommonModule],
  standalone: true
})
export class HeaderComponent {

public readonly matIcons: MatIconRegistry

 constructor(@Inject(MatIconRegistry)matIcons: MatIconRegistry, private router: Router){
  this.matIcons = matIcons
  matIcons.addSvgIcon('home', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200')
 }
 navigateToHome(): void {
  this.router.navigate(['/']);
}

navigateToFavorites(): void {
  this.router.navigate(['/favorites']);
}
}
