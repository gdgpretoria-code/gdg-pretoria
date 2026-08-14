import { Component, HostListener, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface HeroSlide {
  src: string;
  alt: string;
  fit: 'cover' | 'contain';
  position: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HeroComponent implements OnDestroy {
  readonly whatsappUrl = 'https://chat.whatsapp.com';
  readonly intervalMs = 6500;

  readonly slides: HeroSlide[] = [
    {
      src: 'assets/hero/main-bg.jpg',
      alt: 'GDG Pretoria community members gathered outside Audi Centre',
      fit: 'cover',
      position: 'center 42%'
    },
    {
      src: 'assets/hero/bwAi.jpg',
      alt: 'GDG Pretoria Union Buildings branding',
      fit: 'cover',
      position: 'center 42%'
    },
    {
      src: 'assets/hero/dft.png',
      alt: 'Google Developer Groups globe mark',
      fit: 'cover',
      position: 'center 42%'
    },
    {
      src: 'assets/hero/wmh.png',
      alt: 'Google Developer Groups bracket mark',
      fit: 'cover',
      position: 'center 42%'
    }
  ];

  activeIndex = signal(0);

  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    this.start();
  }

  @HostListener('document:visibilitychange')
  onVisibility() {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  }

  ngOnDestroy() {
    this.stop();
  }

  private start() {
    if (this.reduceMotion || this.timer) return;
    this.timer = setInterval(() => {
      this.activeIndex.update((index) => (index + 1) % this.slides.length);
    }, this.intervalMs);
  }

  private stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
