import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-blue">Events & Media Hub</span>
        <h1 class="gradient-text">GDG Pretoria Events & Knowledge Directory</h1>
        <p>Browse upcoming technical sessions, past meetup archives, speaker interviews, and video recordings.</p>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-nav">
        <button [class.active]="activeTab() === 'directory'" (click)="activeTab.set('directory')">
          <span class="material-icons-outlined">event</span> Event Directory
        </button>
        <button [class.active]="activeTab() === 'gallery'" (click)="activeTab.set('gallery')">
          <span class="material-icons-outlined">photo_library</span> Media Gallery
        </button>
        <button [class.active]="activeTab() === 'blog'" (click)="activeTab.set('blog')">
          <span class="material-icons-outlined">article</span> Blog & Interviews
        </button>
        <button [class.active]="activeTab() === 'videos'" (click)="activeTab.set('videos')">
          <span class="material-icons-outlined">play_circle</span> Video Archives
        </button>
      </div>

      <!-- TAB 1: EVENT DIRECTORY -->
      @if (activeTab() === 'directory') {
        <div class="filter-bar">
          <span class="filter-label">Filter Track:</span>
          @for (cat of categories; track cat) {
            <button [class.active]="selectedCategory() === cat" (click)="selectedCategory.set(cat)" class="btn-filter">
              {{ cat }}
            </button>
          }
        </div>

        <div class="events-grid">
          @for (event of filteredEvents(); track event.id) {
            <div class="gdg-card event-card">
              <div class="event-card-img-wrap">
                <img [src]="event.image" [alt]="event.title">
                <span class="badge badge-green category-pill">{{ event.category }}</span>
              </div>
              <div class="event-card-body">
                <div class="event-card-date">
                  <span class="material-icons-outlined">calendar_today</span> {{ event.date }} • {{ event.time }}
                </div>
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
                <div class="venue-location">
                  <span class="material-icons-outlined">place</span> {{ event.venueName }}
                </div>

                <div class="event-card-footer">
                  <button (click)="rsvp(event.id)" class="btn btn-primary btn-sm">
                    RSVP ({{ event.rsvpCount }})
                  </button>
                  <a [href]="event.rsvpLink" target="_blank" class="btn btn-secondary btn-sm">Bevy Page ↗</a>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- TAB 2: MEDIA GALLERY -->
      @if (activeTab() === 'gallery') {
        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" alt="Speaker on Stage">
            <div class="gallery-caption">Dr. Kobus presenting Gemini 1.5 at Innovation Hub</div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" alt="Code Lab Session">
            <div class="gallery-caption">Angular 22 Hands-on Workshop at TUT Tech Campus</div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" alt="Networking">
            <div class="gallery-caption">Developer Networking & Pizza Session Pretoria</div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80" alt="Audience">
            <div class="gallery-caption">DevFest Pretoria Keynote Auditorium</div>
          </div>
        </div>
      }

      <!-- TAB 3: BLOG & SPEAKER INTERVIEWS -->
      @if (activeTab() === 'blog') {
        <div class="blog-grid">
          @for (post of blogPosts(); track post.id) {
            <div class="gdg-card blog-card">
              <img [src]="post.coverImage" [alt]="post.title" class="blog-cover">
              <div class="blog-card-body">
                @if (post.isInterview) {
                  <span class="badge badge-red mb-2">🎤 Speaker Interview</span>
                }
                <h3>{{ post.title }}</h3>
                <p>{{ post.summary }}</p>
                <div class="blog-author-row">
                  <img [src]="post.authorAvatar" alt="Avatar" class="avatar-xs">
                  <div>
                    <strong>{{ post.authorName }}</strong>
                    <span class="text-dim"> • {{ post.publishedAt }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- TAB 4: VIDEO ARCHIVES -->
      @if (activeTab() === 'videos') {
        <div class="videos-grid">
          <div class="gdg-card video-card">
            <div class="video-placeholder">
              <span class="material-icons-outlined play-icon">play_circle_filled</span>
            </div>
            <h3>DevFest Pretoria 2025: Keynote & Gemini Multimodal Live Demo</h3>
            <p>Recorded session covering Vertex AI pipelines and Android 15 Compose updates.</p>
          </div>

          <div class="gdg-card video-card">
            <div class="video-placeholder">
              <span class="material-icons-outlined play-icon">play_circle_filled</span>
            </div>
            <h3>Mastering Angular Signals & Control Flow</h3>
            <p>90-minute masterclass workshop stream with code walkthroughs.</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .header-center {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 3rem auto;
    }
    .tab-nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1rem;
      flex-wrap: wrap;
    }
    .tab-nav button {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1rem;
      font-weight: 600;
      padding: 0.6rem 1.2rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s ease;
    }
    .tab-nav button.active, .tab-nav button:hover {
      background: var(--bg-card);
      color: var(--gdg-blue);
    }
    .filter-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .filter-label {
      font-weight: 600;
      font-size: 0.9rem;
      margin-right: 0.5rem;
    }
    .btn-filter {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      padding: 0.4rem 1rem;
      border-radius: var(--radius-full);
      cursor: pointer;
    }
    .btn-filter.active {
      background: var(--gdg-blue);
      color: white;
      border-color: var(--gdg-blue);
    }
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.75rem;
    }
    .event-card {
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .event-card-img-wrap {
      position: relative;
      height: 200px;
    }
    .event-card-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .category-pill {
      position: absolute;
      top: 0.8rem;
      left: 0.8rem;
    }
    .event-card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      flex: 1;
    }
    .event-card-date {
      font-size: 0.85rem;
      color: var(--gdg-blue);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .venue-location {
      font-size: 0.85rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .event-card-footer {
      margin-top: auto;
      display: flex;
      gap: 0.75rem;
      padding-top: 1rem;
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .gallery-item {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      height: 240px;
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.05);
    }
    .gallery-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.85));
      color: white;
      font-size: 0.85rem;
    }
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.75rem;
    }
    .blog-card {
      padding: 0;
      overflow: hidden;
    }
    .blog-cover {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .blog-card-body {
      padding: 1.5rem;
    }
    .avatar-xs {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    .blog-author-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.85rem;
    }
    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 1.75rem;
    }
    .video-placeholder {
      height: 220px;
      background: #000;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      cursor: pointer;
    }
    .play-icon {
      font-size: 4rem;
      color: var(--gdg-red);
    }
    .mb-2 { margin-bottom: 0.5rem; }
  `]
})
export class EventsComponent implements OnInit {
  private api = inject(ApiService);
  activeTab = signal<'directory' | 'gallery' | 'blog' | 'videos'>('directory');
  selectedCategory = signal<string>('All');
  categories = ['All', 'Web', 'AI/ML', 'Cloud', 'Mobile'];

  events = signal<any[]>([]);
  blogPosts = signal<any[]>([]);

  async ngOnInit() {
    try {
      const eRes: any = await this.api.get('/events');
      this.events.set(eRes.events || []);

      const bRes: any = await this.api.get('/blog');
      this.blogPosts.set(bRes.blogPosts || []);
    } catch (err) {
      console.error('Failed loading events content:', err);
    }
  }

  filteredEvents() {
    if (this.selectedCategory() === 'All') return this.events();
    return this.events().filter(e => e.category === this.selectedCategory());
  }

  async rsvp(eventId: string) {
    try {
      const res: any = await this.api.post(`/events/${eventId}/rsvp`, {});
      this.events.update(list => list.map(e => e.id === eventId ? { ...e, rsvpCount: res.rsvpCount } : e));
      alert('🎉 RSVP Confirmed!');
    } catch (e: any) {
      alert(e.message || 'RSVP failed');
    }
  }
}
