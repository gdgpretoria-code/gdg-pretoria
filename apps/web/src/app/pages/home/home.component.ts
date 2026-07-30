import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="hero-section container">
      <div class="hero-badge animate-fade-in">
        <span class="dot blue"></span>
        <span class="badge-text">GDG Pretoria Ecosystem • 2026 Season</span>
      </div>

      <h1 class="hero-title animate-fade-in">
        Empowering Developers with <br>
        <span class="gradient-text">Google Cloud, AI & Modern Web</span>
      </h1>

      <p class="hero-subtitle animate-fade-in">
        Connect with over 1,500+ Pretoria engineers, researchers, and creators. Master Angular 22+, Gemini 1.5, Vertex AI, and Android Kotlin through hands-on workshops and technical talks.
      </p>

      <div class="hero-cta animate-fade-in">
        <a href="https://chat.whatsapp.com" target="_blank" class="btn btn-primary">
          <span class="material-icons-outlined">forum</span> Join WhatsApp Community
        </a>
        <a routerLink="/events" class="btn btn-secondary">
          <span class="material-icons-outlined">event</span> Explore Meetups
        </a>
        <a routerLink="/mock-interview" class="btn btn-outline-blue">
          <span class="material-icons-outlined">terminal</span> Practice Mock Interviews
        </a>
      </div>

      <div class="tech-pills">
        <span class="badge badge-blue">Google Cloud</span>
        <span class="badge badge-red">Gemini 1.5 Pro</span>
        <span class="badge badge-yellow">Angular 22+</span>
        <span class="badge badge-green">Android & Compose</span>
        <span class="badge badge-blue">Firebase</span>
        <span class="badge badge-green">TensorFlow & Keras</span>
      </div>
    </section>

    <!-- Sponsor & Partner Ribbon -->
    <section class="sponsor-ribbon">
      <div class="container">
        <p class="sponsor-heading">SUPPORTED BY INDUSTRY LEADERS IN SOUTH AFRICA</p>
        <div class="sponsor-logos">
          <a href="https://cloud.google.com" target="_blank" class="sponsor-item">
            <span class="material-icons-outlined">cloud</span> Google Cloud
          </a>
          <a href="https://derivco.com" target="_blank" class="sponsor-item">
            <span class="material-icons-outlined">code</span> Derivco Pretoria
          </a>
          <a href="https://theinnovationhub.com" target="_blank" class="sponsor-item">
            <span class="material-icons-outlined">business</span> Innovation Hub Pretoria
          </a>
          <a href="https://csir.co.za" target="_blank" class="sponsor-item">
            <span class="material-icons-outlined">account_balance</span> CSIR South Africa
          </a>
        </div>
      </div>
    </section>

    <!-- Upcoming Event Teaser -->
    <section class="container section-padding">
      <div class="section-header">
        <div>
          <h2>Next Big Meetup</h2>
          <p>Reserve your seat at our upcoming GDG Pretoria workshop</p>
        </div>
        <a routerLink="/events" class="btn btn-secondary">View All Events &rarr;</a>
      </div>

      @if (featuredEvent) {
        <div class="gdg-card event-teaser-card glass-panel">
          <div class="event-image-wrap">
            <img [src]="featuredEvent.image" [alt]="featuredEvent.title" class="event-img">
            <span class="badge badge-green category-tag">{{ featuredEvent.category }}</span>
          </div>
          <div class="event-details">
            <div class="event-date-badge">
              <span class="material-icons-outlined">calendar_today</span> {{ featuredEvent.date }} • {{ featuredEvent.time }}
            </div>
            <h3>{{ featuredEvent.title }}</h3>
            <p>{{ featuredEvent.description }}</p>

            <div class="venue-info">
              <span class="material-icons-outlined">place</span> {{ featuredEvent.venueName }} ({{ featuredEvent.location }})
            </div>

            <div class="speakers-preview">
              <span class="speaker-label">Featured Speakers:</span>
              <div class="speaker-pills">
                @for (speaker of featuredEvent.speakersJson; track speaker.name) {
                  <span class="badge badge-blue">{{ speaker.name }} ({{ speaker.role }})</span>
                }
              </div>
            </div>

            <div class="card-footer-actions">
              <button (click)="rsvpEvent(featuredEvent.id)" class="btn btn-primary">
                <span class="material-icons-outlined">check_circle</span> RSVP Now ({{ featuredEvent.rsvpCount }} Attendees)
              </button>
              <a [href]="featuredEvent.rsvpLink" target="_blank" class="btn btn-secondary">
                Official Bevy Page ↗
              </a>
            </div>
          </div>
        </div>
      } @else {
        <div class="gdg-card text-center p-4">Loading featured meetup...</div>
      }
    </section>

    <!-- Community Spotlight -->
    <section class="container section-padding">
      <div class="section-header">
        <h2>Community Spotlight</h2>
        <p>Projects built by GDG Pretoria members</p>
      </div>

      <div class="spotlight-grid">
        <div class="gdg-card">
          <span class="badge badge-blue">AI Healthcare</span>
          <h3>MedGemini Pretoria</h3>
          <p>Clinical triage assistant utilizing Gemini 1.5 Pro multimodal vision to assist rural healthcare clinics in Gauteng.</p>
          <div class="card-author">
            <span class="material-icons-outlined">person</span> Built by Dr. Kobus van der Merwe
          </div>
        </div>

        <div class="gdg-card">
          <span class="badge badge-green">Web Ecosystem</span>
          <h3>Angular Signals Boilerplate</h3>
          <p>Zero-boilerplate enterprise template with zone-less Signals state management and Drizzle ORM integration.</p>
          <div class="card-author">
            <span class="material-icons-outlined">person</span> Built by Zanele Khumalo
          </div>
        </div>

        <div class="gdg-card">
          <span class="badge badge-red">Cloud DevOps</span>
          <h3>GCP IAM Guardrail Bot</h3>
          <p>Automated cloud security auditor bot that scans Google Cloud organization policies and alerts via Slack.</p>
          <div class="card-author">
            <span class="material-icons-outlined">person</span> Built by Sipho Zulu
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      text-align: center;
      padding: 4rem 1rem 3rem 1rem;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      padding: 0.4rem 1.1rem;
      border-radius: var(--radius-full);
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }
    .hero-badge .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--gdg-blue);
    }
    .hero-title {
      font-size: 3.25rem;
      margin-bottom: 1.25rem;
    }
    .hero-subtitle {
      font-size: 1.15rem;
      max-width: 760px;
      margin: 0 auto 2rem auto;
    }
    .hero-cta {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }
    .tech-pills {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.6rem;
    }

    .sponsor-ribbon {
      background: var(--bg-card);
      border-y: 1px solid var(--border-color);
      padding: 2.5rem 0;
      margin: 2rem 0;
      text-align: center;
    }
    .sponsor-heading {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      color: var(--text-dim);
      margin-bottom: 1.25rem;
      font-weight: 700;
    }
    .sponsor-logos {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 2.5rem;
    }
    .sponsor-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 600;
      font-size: 1.05rem;
      transition: color 0.2s ease;
    }
    .sponsor-item:hover { color: var(--gdg-blue); }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }

    .event-teaser-card {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 2rem;
      padding: 0;
      overflow: hidden;
    }
    .event-image-wrap {
      position: relative;
      height: 100%;
      min-height: 280px;
    }
    .event-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .category-tag {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
    .event-details {
      padding: 2rem 2rem 2rem 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }
    .event-date-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--gdg-blue);
      font-weight: 600;
      font-size: 0.9rem;
    }
    .venue-info {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    .speakers-preview {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .speaker-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-dim);
    }
    .speaker-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .card-footer-actions {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .spotlight-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .card-author {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      color: var(--gdg-blue);
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .hero-title { font-size: 2.2rem; }
      .event-teaser-card { grid-template-columns: 1fr; }
      .event-details { padding: 1.5rem; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  featuredEvent: any = null;

  async ngOnInit() {
    try {
      const res: any = await this.api.get('/events');
      if (res.events && res.events.length > 0) {
        this.featuredEvent = res.events.find((e: any) => e.isFeatured) || res.events[0];
      }
    } catch (e) {
      console.error('Failed to load events:', e);
    }
  }

  async rsvpEvent(eventId: string) {
    try {
      const res: any = await this.api.post(`/events/${eventId}/rsvp`, {});
      if (this.featuredEvent) {
        this.featuredEvent.rsvpCount = res.rsvpCount;
      }
      alert('🎉 RSVP Confirmed for GDG Pretoria Meetup!');
    } catch (e: any) {
      alert(e.message || 'RSVP failed');
    }
  }
}
