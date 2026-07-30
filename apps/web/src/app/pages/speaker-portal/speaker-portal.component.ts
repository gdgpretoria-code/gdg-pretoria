import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-speaker-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-red">Call For Papers (CFP)</span>
        <h1 class="gradient-text-red">GDG Pretoria Speaker Portal</h1>
        <p>Share your knowledge, research, or developer journey with our community of 1,500+ tech professionals in Pretoria.</p>
      </div>

      <div class="portal-grid">
        <!-- CFP FORM -->
        <div class="gdg-card glass-panel form-card">
          <h2>Submit a Talk Proposal</h2>
          <p class="mb-4">Fill out the paper abstract submission form below. Our organizing team reviews proposals continuously.</p>

          <form (ngSubmit)="submitCFP()">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" [(ngModel)]="form.name" name="name" class="form-control" placeholder="e.g. Dr. Kobus van der Merwe" required>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" [(ngModel)]="form.email" name="email" class="form-control" placeholder="speaker@domain.com" required>
            </div>

            <div class="form-group">
              <label class="form-label">Talk Title *</label>
              <input type="text" [(ngModel)]="form.talkTitle" name="talkTitle" class="form-control" placeholder="e.g. Building Multimodal Agents with Gemini 1.5 & Vertex AI" required>
            </div>

            <div class="form-group">
              <label class="form-label">Topic Track *</label>
              <select [(ngModel)]="form.topicTrack" name="topicTrack" class="form-control">
                <option value="AI/ML">AI / Machine Learning (Gemini, Vertex AI, TensorFlow)</option>
                <option value="Web">Web Engineering (Angular 22+, RxJS, Node.js, Drizzle)</option>
                <option value="Cloud/GCP">Google Cloud Platform & DevOps (Kubernetes, Serverless)</option>
                <option value="Mobile">Mobile Development (Android, Jetpack Compose, Flutter)</option>
                <option value="Career">Career & Tech Leadership</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Abstract / Summary *</label>
              <textarea [(ngModel)]="form.abstract" name="abstract" class="form-control" placeholder="Provide a 2-3 paragraph summary of what attendees will learn from your talk..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Speaker Biography *</label>
              <textarea [(ngModel)]="form.bio" name="bio" class="form-control" placeholder="Brief intro about your current role, research, or experience..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Draft Presentation / Deck URL (Optional)</label>
              <input type="url" [(ngModel)]="form.slidesUrl" name="slidesUrl" class="form-control" placeholder="https://slides.google.com/...">
            </div>

            <button type="submit" [disabled]="submitting()" class="btn btn-primary btn-block">
              <span class="material-icons-outlined">send</span> {{ submitting() ? 'Submitting Proposal...' : 'Submit Talk Abstract' }}
            </button>
          </form>
        </div>

        <!-- SIDEBAR: WISHLIST & GUIDELINES -->
        <div class="sidebar-col">
          <!-- REQUESTED TOPICS -->
          <div class="gdg-card mb-4">
            <h3>🔥 Community Topic Wishlist</h3>
            <p class="text-sm mb-3">High-demand topics requested by our members for upcoming meetups:</p>
            <ul class="wishlist">
              <li><span class="material-icons-outlined text-blue">check_circle</span> Fine-Tuning Open Source LLMs on Vertex AI</li>
              <li><span class="material-icons-outlined text-green">check_circle</span> Angular 22 Signals vs Zone.js Performance benchmarks</li>
              <li><span class="material-icons-outlined text-red">check_circle</span> Zero-Trust Security & Workload Identity on GCP</li>
              <li><span class="material-icons-outlined text-yellow">check_circle</span> Kotlin Multiplatform (KMP) for Mobile & Web</li>
            </ul>
          </div>

          <!-- SPEAKER GUIDELINES -->
          <div class="gdg-card">
            <h3>📋 Speaker Guidelines</h3>
            <ol class="guidelines-list">
              <li><strong>Session Formats:</strong> 15-min Lightning Talks, 45-min Deep Dive, or 90-min Code Lab.</li>
              <li><strong>No Sales Pitches:</strong> Focus on real-world engineering, architecture choices, and code walkthroughs.</li>
              <li><strong>Inclusivity:</strong> Abide strictly by the GDG Community Code of Conduct.</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- HALL OF FAME -->
      <section class="section-padding">
        <div class="section-header">
          <div>
            <h2>Speaker Recognition Wall (Hall of Fame)</h2>
            <p>Honoring previous speakers who shared knowledge with GDG Pretoria</p>
          </div>
        </div>

        <div class="hall-grid">
          @for (speaker of hallOfFame(); track speaker.id) {
            <div class="gdg-card hall-card">
              <img [src]="speaker.avatarUrl" [alt]="speaker.name" class="speaker-avatar">
              <div class="hall-info">
                <h3>{{ speaker.name }}</h3>
                <span class="badge badge-blue mb-1">{{ speaker.topicTrack }}</span>
                <p class="talk-title">"{{ speaker.talkTitle }}"</p>
                <div class="hall-links">
                  @if (speaker.slidesUrl) { <a [href]="speaker.slidesUrl" target="_blank">Slides ↗</a> }
                  @if (speaker.videoUrl) { <a [href]="speaker.videoUrl" target="_blank">Recording ↗</a> }
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .header-center {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 3rem auto;
    }
    .portal-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2rem;
    }
    .form-card { padding: 2rem; }
    .btn-block { width: 100%; justify-content: center; margin-top: 1rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .text-sm { font-size: 0.85rem; }

    .wishlist {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.9rem;
    }
    .wishlist li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .text-blue { color: var(--gdg-blue); }
    .text-green { color: var(--gdg-green); }
    .text-red { color: var(--gdg-red); }
    .text-yellow { color: var(--gdg-yellow); }

    .guidelines-list {
      padding-left: 1.2rem;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      color: var(--text-muted);
    }

    .hall-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .hall-card {
      display: flex;
      gap: 1.25rem;
      align-items: center;
    }
    .speaker-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--gdg-blue);
    }
    .talk-title {
      font-size: 0.9rem;
      font-style: italic;
      color: var(--text-main);
      margin: 0.25rem 0;
    }
    .hall-links a {
      font-size: 0.8rem;
      color: var(--gdg-blue);
      text-decoration: none;
      margin-right: 0.75rem;
      font-weight: 600;
    }
    @media (max-width: 768px) {
      .portal-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SpeakerPortalComponent implements OnInit {
  private api = inject(ApiService);
  submitting = signal<boolean>(false);
  hallOfFame = signal<any[]>([]);

  form = {
    name: '',
    email: '',
    talkTitle: '',
    topicTrack: 'AI/ML',
    abstract: '',
    bio: '',
    slidesUrl: ''
  };

  async ngOnInit() {
    try {
      const res: any = await this.api.get('/speakers');
      this.hallOfFame.set(res.speakers || []);
    } catch (e) {
      console.error(e);
    }
  }

  async submitCFP() {
    if (!this.form.name || !this.form.email || !this.form.talkTitle || !this.form.abstract) {
      alert('Please fill out all required fields');
      return;
    }

    this.submitting.set(true);
    try {
      await this.api.post('/speakers/cfp', this.form);
      alert('🎉 Talk proposal submitted successfully! Our committee will review it shortly.');
      this.form = { name: '', email: '', talkTitle: '', topicTrack: 'AI/ML', abstract: '', bio: '', slidesUrl: '' };
    } catch (err: any) {
      alert(err.message || 'CFP submission failed');
    } finally {
      this.submitting.set(false);
    }
  }
}
