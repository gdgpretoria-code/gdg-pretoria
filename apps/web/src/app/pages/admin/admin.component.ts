import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, AuthService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-red">Organizer Dashboard</span>
        <h1 class="gradient-text-red">GDG Pretoria Administrative Desk</h1>
        <p>Review speaker proposals (CFP), create meetups, publish blog articles, and manage community needs.</p>
      </div>

      <!-- STATS OVERVIEW -->
      @if (stats()) {
        <div class="stats-grid mb-5">
          <div class="gdg-card stat-card">
            <h3>{{ stats().totalEvents }}</h3>
            <p>Total Meetups</p>
          </div>
          <div class="gdg-card stat-card border-red">
            <h3>{{ stats().pendingCFPs }}</h3>
            <p>Pending CFPs</p>
          </div>
          <div class="gdg-card stat-card border-green">
            <h3>{{ stats().activeJobs }}</h3>
            <p>Active Job Posts</p>
          </div>
          <div class="gdg-card stat-card border-blue">
            <h3>{{ stats().totalMembers }}</h3>
            <p>Registered Members</p>
          </div>
        </div>
      }

      <!-- TAB CONTROLS -->
      <div class="tab-nav">
        <button [class.active]="activeTab() === 'cfps'" (click)="activeTab.set('cfps')">
          Review CFPs ({{ speakers().length }})
        </button>
        <button [class.active]="activeTab() === 'newEvent'" (click)="activeTab.set('newEvent')">
          + Create Meetup
        </button>
        <button [class.active]="activeTab() === 'newJob'" (click)="activeTab.set('newJob')">
          + Post Job Opportunity
        </button>
      </div>

      <!-- TAB 1: CFP REVIEW -->
      @if (activeTab() === 'cfps') {
        <div class="cfp-list">
          @for (spk of speakers(); track spk.id) {
            <div class="gdg-card cfp-review-card mb-3">
              <div class="cfp-header">
                <div>
                  <h3>{{ spk.talkTitle }}</h3>
                  <p class="text-sm">Submitted by <strong>{{ spk.name }}</strong> ({{ spk.email }})</p>
                </div>
                <span class="badge" [class.badge-yellow]="spk.status === 'PENDING'" [class.badge-green]="spk.status === 'APPROVED'">
                  {{ spk.status }}
                </span>
              </div>
              <p class="abstract-text">"{{ spk.abstract }}"</p>

              <div class="cfp-actions mt-3">
                <button (click)="updateStatus(spk.id, 'APPROVED')" class="btn btn-primary btn-sm">
                  Approve Talk & Add to Hall of Fame
                </button>
                <button (click)="updateStatus(spk.id, 'REJECTED')" class="btn btn-secondary btn-sm">
                  Decline Abstract
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- TAB 2: CREATE EVENT FORM -->
      @if (activeTab() === 'newEvent') {
        <div class="gdg-card glass-panel form-card">
          <h2>Create New GDG Pretoria Event</h2>
          <form (ngSubmit)="createEvent()">
            <div class="form-group">
              <label class="form-label">Event Title</label>
              <input type="text" [(ngModel)]="eventForm.title" name="title" class="form-control" placeholder="DevFest Pretoria 2026" required>
            </div>
            <div class="form-group">
              <label class="form-label">Category Track</label>
              <select [(ngModel)]="eventForm.category" name="category" class="form-control">
                <option value="Web">Web Engineering</option>
                <option value="AI/ML">AI / Machine Learning</option>
                <option value="Cloud">Google Cloud Platform</option>
                <option value="Mobile">Mobile (Android/Compose)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date & Time</label>
              <input type="text" [(ngModel)]="eventForm.date" name="date" class="form-control" placeholder="2026-09-15" required>
            </div>
            <div class="form-group">
              <label class="form-label">Location & Venue Name</label>
              <input type="text" [(ngModel)]="eventForm.location" name="location" class="form-control" placeholder="The Innovation Hub, Pretoria" required>
            </div>
            <div class="form-group">
              <label class="form-label">Event Description</label>
              <textarea [(ngModel)]="eventForm.description" name="description" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Publish Meetup</button>
          </form>
        </div>
      }

      <!-- TAB 3: POST JOB FORM -->
      @if (activeTab() === 'newJob') {
        <div class="gdg-card glass-panel form-card">
          <h2>Post Sponsor Job Opportunity</h2>
          <form (ngSubmit)="createJob()">
            <div class="form-group">
              <label class="form-label">Role Title</label>
              <input type="text" [(ngModel)]="jobForm.title" name="title" class="form-control" placeholder="Senior Cloud Architect" required>
            </div>
            <div class="form-group">
              <label class="form-label">Company Name</label>
              <input type="text" [(ngModel)]="jobForm.company" name="company" class="form-control" placeholder="Google Cloud Partner SA" required>
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" [(ngModel)]="jobForm.location" name="location" class="form-control" placeholder="Pretoria / Remote" required>
            </div>
            <div class="form-group">
              <label class="form-label">Role Type</label>
              <input type="text" [(ngModel)]="jobForm.roleType" name="roleType" class="form-control" placeholder="Full-time" required>
            </div>
            <div class="form-group">
              <label class="form-label">Role Description & Application Link</label>
              <textarea [(ngModel)]="jobForm.description" name="description" class="form-control" required></textarea>
              <input type="url" [(ngModel)]="jobForm.applicationLink" name="applicationLink" class="form-control mt-2" placeholder="https://company.com/apply" required>
            </div>
            <button type="submit" class="btn btn-primary">Publish Job Posting</button>
          </form>
        </div>
      }
    </div>
  `,
  styles: [`
    .header-center { text-align: center; max-width: 720px; margin: 0 auto 3rem auto; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }
    .stat-card { text-align: center; }
    .stat-card h3 { font-size: 2.25rem; color: var(--gdg-blue); }
    .border-red h3 { color: var(--gdg-red); }
    .border-green h3 { color: var(--gdg-green); }
    .border-blue h3 { color: var(--gdg-blue); }
    .tab-nav { display: flex; gap: 1rem; margin-bottom: 2rem; }
    .tab-nav button { background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); padding: 0.6rem 1.25rem; border-radius: var(--radius-full); cursor: pointer; }
    .tab-nav button.active { background: var(--gdg-red); color: white; border-color: var(--gdg-red); }
    .mb-5 { margin-bottom: 3rem; }
    .mb-3 { margin-bottom: 1rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-2 { margin-top: 0.5rem; }
    .text-sm { font-size: 0.85rem; }
    .cfp-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .abstract-text { font-size: 0.9rem; font-style: italic; margin-top: 0.5rem; }
    .cfp-actions { display: flex; gap: 0.75rem; }
    .form-card { max-width: 680px; margin: 0 auto; padding: 2rem; }
  `]
})
export class AdminComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  activeTab = signal<'cfps' | 'newEvent' | 'newJob'>('cfps');
  stats = signal<any>(null);
  speakers = signal<any[]>([]);

  eventForm = { title: '', category: 'Web', date: '', location: '', description: '' };
  jobForm = { title: '', company: '', location: '', roleType: 'Full-time', description: '', applicationLink: '' };

  async ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const sRes: any = await this.api.get('/admin/stats');
      this.stats.set(sRes);

      const spkRes: any = await this.api.get('/speakers');
      this.speakers.set(spkRes.speakers || []);
    } catch (e) {
      console.error(e);
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      await this.api.patch(`/admin/cfps/${id}/status`, { status, isHallOfFame: status === 'APPROVED' });
      alert(`CFP status updated to ${status}`);
      this.loadData();
    } catch (e: any) {
      alert(e.message || 'Status update failed');
    }
  }

  async createEvent() {
    try {
      await this.api.post('/events', this.eventForm);
      alert('🎉 New meetup published successfully!');
      this.eventForm = { title: '', category: 'Web', date: '', location: '', description: '' };
    } catch (e: any) {
      alert(e.message || 'Event creation failed');
    }
  }

  async createJob() {
    try {
      await this.api.post('/jobs', this.jobForm);
      alert('🎉 Job opportunity published on Job Board!');
      this.jobForm = { title: '', company: '', location: '', roleType: 'Full-time', description: '', applicationLink: '' };
    } catch (e: any) {
      alert(e.message || 'Job creation failed');
    }
  }
}
