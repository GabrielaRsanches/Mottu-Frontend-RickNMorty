import { Component, EventEmitter, Inject, inject, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FavoritesComponent } from '../favorites/favorites.component';
import { FavoriteCharactersService } from '../favorites/favorites.service';

@Component({
  selector: 'app-header',
  template: `
    <head class="header">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <script type="importmap">
        {
          "imports": {
            "@material/web/": "https://esm.run/@material/web/"
          }
        }
      </script>
      <script type="module">
        import '@material/web/all.js';
        import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';

        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
      </script>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </head>
    <mat-toolbar class="header-component">
      <img src="../../assets/logo.png" />
      <div class="menu-icons">
        <button
          title="Início"
          mat-icon-button
          (click)="navigateToHome()"
          class="example-icon header-icons"
          aria-label="home"
        >
          <mat-icon id="icon" fontIcon="home"></mat-icon>
        </button>
        <button mat-icon-button (click)="navigateToFavorites()" class="header-icons">
          <mat-icon id="icon" fontIcon="favorites"></mat-icon>
          <p>{{ favoritesCount }}</p>
        </button>
      </div>
    </mat-toolbar>

    <router-outlet></router-outlet>
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular/material/toolbar"></script>
  `,
  styleUrls: ['../../../styles.css'],
  imports: [FavoritesComponent, RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, CommonModule],
  standalone: true,
})
export class HeaderComponent {
  public readonly matIcons: MatIconRegistry;
  public favoritesCount: number = 0;
  @Output() counterChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(MatIconRegistry) matIcons: MatIconRegistry,
    private router: Router,
    private favoritesService: FavoriteCharactersService,
  ) {
    this.matIcons = matIcons;
    matIcons.addSvgIcon(
      'home',
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    );
  }
  ngOnInit(): void {
    this.favoritesService.getFavoritesCount().subscribe((count) => {
      this.favoritesCount = count;
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
