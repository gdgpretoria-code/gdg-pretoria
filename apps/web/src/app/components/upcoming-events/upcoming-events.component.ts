import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service.js';

export interface LandingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venueName: string;
  location: string;
  image: string;
  category: string;
  rsvpCount: number;
  rsvpLink: string;
}

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.css'
})
export class UpcomingEventsComponent implements OnInit {
  private api = inject(ApiService);
  events = signal<LandingEvent[]>([]);

  private readonly fallback: LandingEvent[] = [
    {
      id: 'evt-1',
      title: 'GDG Pretoria Tech Fest 2026',
      description: 'A full-day summit with Gemini, Google Cloud, and Angular workshops.',
      date: '2026-08-25',
      time: '09:00 AM',
      venueName: 'The Innovation Hub',
      location: 'Pretoria',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      category: 'AI/ML',
      rsvpCount: 240,
      rsvpLink: 'https://gdg.community.dev/gdg-pretoria/'
    },
    {
      id: 'evt-2',
      title: 'DevFest Pretoria 2026',
      description: 'Android, Flutter, modern web, and Cloud DevOps across three tracks.',
      date: '2026-10-14',
      time: '08:30 AM',
      venueName: 'CSIR ICC Pretoria',
      location: 'Pretoria East',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      category: 'Android',
      rsvpCount: 450,
      rsvpLink: 'https://gdg.community.dev/gdg-pretoria/'
    },
    {
      id: 'evt-3',
      title: 'Angular 22 & Drizzle Workshop',
      description: 'A hands-on lab building a realtime Angular app with Node and Postgres.',
      date: '2026-07-12',
      time: '10:00 AM',
      venueName: 'TUT Tech Campus',
      location: 'Pretoria',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      category: 'Web',
      rsvpCount: 85,
      rsvpLink: 'https://gdg.community.dev/gdg-pretoria/'
    }
  ];

  async ngOnInit() {
    try {
      const res: any = await this.api.get('/events');
      const list = Array.isArray(res?.events) ? res.events : [];
      this.events.set((list.length ? list : this.fallback).slice(0, 3));
    } catch {
      this.events.set(this.fallback);
    }
  }

  accent(index: number) {
    return ['blue', 'green', 'coral'][index % 3];
  }

  meta(event: LandingEvent) {
    return `${event.venueName} · ${this.formatDate(event.date)}`;
  }

  formatDate(value: string) {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return value;
    return new Date(year, month - 1, day).toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  async rsvp(event: LandingEvent) {
    try {
      const res: any = await this.api.post(`/events/${event.id}/rsvp`, {});
      this.events.update((items) =>
        items.map((item) =>
          item.id === event.id ? { ...item, rsvpCount: res.rsvpCount ?? item.rsvpCount + 1 } : item
        )
      );
    } catch {
      window.open(event.rsvpLink, '_blank', 'noopener');
    }
  }
}
