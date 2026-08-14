import { Component, HostListener, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnDestroy {
  authService = inject(AuthService);
  private router = inject(Router);

  menuOpen = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');

  readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/events', label: 'Events', exact: false },
    { path: '/speaker-portal', label: 'Speakers', exact: false },
    { path: '/member-portal', label: 'Members', exact: false },
    { path: '/resources', label: 'Resources', exact: false }
  ];

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.closeOverlays());
  }

  toggleMenu() {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    if (next) this.searchOpen.set(false);
    this.lockScroll(next);
  }

  toggleSearch() {
    const next = !this.searchOpen();
    this.searchOpen.set(next);
    if (next) {
      this.menuOpen.set(false);
      this.lockScroll(false);
    }
  }

  closeOverlays() {
    this.menuOpen.set(false);
    this.searchOpen.set(false);
    this.lockScroll(false);
  }

  submitSearch(event: Event) {
    event.preventDefault();
    const query = this.searchQuery().trim();
    this.closeOverlays();
    this.router.navigate(['/resources'], query ? { queryParams: { q: query } } : {});
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeOverlays();
  }

  ngOnDestroy() {
    this.lockScroll(false);
  }

  private lockScroll(locked: boolean) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}
