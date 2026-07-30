import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, ThemeService } from '../../../core/services/api.service.js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar glass-panel">
      <div class="container navbar-content">
        <a routerLink="/" class="brand-logo">
          <div class="logo-dots">
            <span class="dot blue"></span>
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="brand-name">GDG <strong>Pretoria</strong></span>
        </a>

        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/events" routerLinkActive="active">Events & Media</a>
          <a routerLink="/speaker-portal" routerLinkActive="active">Speaker Portal</a>
          <a routerLink="/member-portal" routerLinkActive="active">Ecosystem & Jobs</a>
          <a routerLink="/mock-interview" routerLinkActive="active" class="highlight-link">
            <span class="material-icons-outlined">code</span> Mock Interviews
          </a>
          <a routerLink="/partnerships" routerLinkActive="active">Partnerships</a>
          <a routerLink="/resources" routerLinkActive="active">Resources</a>
          @if (authService.isAdmin()) {
            <a routerLink="/admin" routerLinkActive="active" class="badge badge-red">Admin Desk</a>
          }
        </div>

        <div class="nav-actions">
          <button (click)="themeService.toggleTheme()" class="theme-toggle btn-icon" title="Toggle Light/Dark Theme">
            <span class="material-icons-outlined">{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</span>
          </button>

          @if (authService.currentUser()) {
            <div class="user-profile-badge">
              <img [src]="authService.currentUser()?.avatarUrl" alt="Avatar" class="avatar-sm">
              <span class="user-name">{{ authService.currentUser()?.name }}</span>
              <button (click)="authService.logout()" class="btn-sm btn-secondary">Logout</button>
            </div>
          } @else {
            <a routerLink="/member-portal" class="btn btn-primary btn-sm">Join Community</a>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 1rem;
      z-index: 1000;
      margin: 0.5rem auto 1.5rem auto;
      max-width: 1240px;
      padding: 0.75rem 1.5rem;
    }
    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: var(--text-main);
      font-size: 1.25rem;
    }
    .logo-dots {
      display: flex;
      gap: 3px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .dot.blue { background: var(--gdg-blue); }
    .dot.red { background: var(--gdg-red); }
    .dot.yellow { background: var(--gdg-yellow); }
    .dot.green { background: var(--gdg-green); }
    
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      transition: color 0.2s ease;
    }
    .nav-links a:hover, .nav-links a.active {
      color: var(--gdg-blue);
    }
    .highlight-link {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--gdg-green) !important;
      font-weight: 600 !important;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .btn-icon {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .avatar-sm {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .user-profile-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
    }
    .btn-sm {
      padding: 0.4rem 0.9rem;
      font-size: 0.85rem;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
}
