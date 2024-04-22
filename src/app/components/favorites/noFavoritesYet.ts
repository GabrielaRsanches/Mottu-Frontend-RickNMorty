import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-no-favorites-yet',
  template: `
    <header>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Poppins&display=swap" rel="stylesheet" />
    </header>
    <div class="no-favorites-yet">
      <mat-card class="no-favorites-card">
        <mat-card-header>
          <mat-card-title>Parece que você ainda não tem favoritos </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>Volte á página inicial e escolha os melhores para você</h3>
          <button id="backToHome" (click)="navigateToHome()">Voltar ao Início</button>
        </mat-card-content>
      </mat-card>
    </div>

    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterOutlet],
  styleUrls: ['../../../styles.css'],
})
export class NoFavoritesYet {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
