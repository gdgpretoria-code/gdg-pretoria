import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.css'
})
export class SponsorsComponent implements OnDestroy {
  readonly sponsors = [
    { name: 'JetBrains', src: 'assets/sponsors/jetbrains.png' },
    { name: 'stoep', src: 'assets/sponsors/stoep.jpeg' },
    { name: 'DVT', src: 'assets/sponsors/dvt.png' },
    { name: 'STADIO Higher Education', src: 'assets/sponsors/stadio.png' },
    { name: 'fynbos', src: 'assets/sponsors/fynbos.jpeg' },
    { name: 'Audi Centre Wonderboom', src: 'assets/sponsors/audi-centre.jpeg' }
  ];

  isMobile = signal(false);
  private media: MediaQueryList | null = null;

  constructor() {
    if (typeof window === 'undefined') return;
    this.media = window.matchMedia('(max-width: 767px)');
    this.isMobile.set(this.media.matches);
    this.media.addEventListener('change', this.onBreakpoint);
  }

  get loopedSponsors() {
    return this.isMobile() ? [...this.sponsors, ...this.sponsors] : this.sponsors;
  }

  ngOnDestroy() {
    this.media?.removeEventListener('change', this.onBreakpoint);
  }

  private onBreakpoint = (event: MediaQueryListEvent) => {
    this.isMobile.set(event.matches);
  };
}
