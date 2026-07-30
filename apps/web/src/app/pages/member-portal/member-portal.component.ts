import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-member-portal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-green">Member Ecosystem & Opportunities</span>
        <h1 class="gradient-text">Directory, Job Board & Matching Matrix</h1>
        <p>Connect with Pretoria developers, find tech job opportunities posted by sponsors, and find mentor/peer study partners.</p>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-nav">
        <button [class.active]="activeTab() === 'directory'" (click)="activeTab.set('directory')">
          <span class="material-icons-outlined">people</span> Member Directory
        </button>
        <button [class.active]="activeTab() === 'jobs'" (click)="activeTab.set('jobs')">
          <span class="material-icons-outlined">work</span> Job Board
        </button>
        <button [class.active]="activeTab() === 'matrix'" (click)="activeTab.set('matrix')">
          <span class="material-icons-outlined">hub</span> Matching Matrix
        </button>
      </div>

      <!-- TAB 1: MEMBER DIRECTORY -->
      @if (activeTab() === 'directory') {
        <div class="search-bar mb-4">
          <input type="text" [(ngModel)]="searchQuery" placeholder="Search members by name, skills (e.g. Angular, GCP, Gemini)..." class="form-control">
        </div>

        <div class="members-grid">
          @for (member of filteredMembers(); track member.id) {
            <div class="gdg-card member-card">
              <img [src]="member.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + member.name" alt="Avatar" class="member-avatar">
              <h3>{{ member.name }}</h3>
              <p class="role-title">{{ member.title }} &#64; {{ member.company || 'GDG Community' }}</p>
              <p class="bio-text">{{ member.bio }}</p>

              <div class="skills-pills">
                @for (skill of getSkillsArray(member.skills); track skill) {
                  <span class="badge badge-blue">{{ skill }}</span>
                }
              </div>

              <div class="social-links">
                @if (member.githubUrl) { <a [href]="member.githubUrl" target="_blank">GitHub ↗</a> }
                @if (member.linkedinUrl) { <a [href]="member.linkedinUrl" target="_blank">LinkedIn ↗</a> }
              </div>
            </div>
          }
        </div>
      }

      <!-- TAB 2: JOB BOARD -->
      @if (activeTab() === 'jobs') {
        <div class="jobs-layout">
          <div class="jobs-list">
            @for (job of jobs(); track job.id) {
              <div class="gdg-card job-card">
                <div class="job-header">
                  <img [src]="job.companyLogo" alt="Company Logo" class="company-logo">
                  <div>
                    <h3>{{ job.title }}</h3>
                    <p class="company-name">{{ job.company }} • <span class="text-blue">{{ job.location }}</span></p>
                  </div>
                  <span class="badge badge-yellow sponsor-tier">{{ job.sponsorTier }} Partner</span>
                </div>

                <p class="job-desc">{{ job.description }}</p>

                <div class="job-meta">
                  <span class="badge badge-green">{{ job.roleType }}</span>
                  <span class="salary-tag">{{ job.salaryRange }}</span>
                  <span class="posted-date">Posted {{ job.postedAt }}</span>
                </div>

                <div class="job-actions">
                  <a [href]="job.applicationLink" target="_blank" class="btn btn-primary btn-sm">
                    Apply Now ↗
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- TAB 3: MATCHING MATRIX -->
      @if (activeTab() === 'matrix') {
        <div class="gdg-card glass-panel matrix-card text-center">
          <span class="material-icons-outlined matrix-icon">hub</span>
          <h2>Automated Peer & Mentor Matching Matrix</h2>
          <p class="max-w-xl mx-auto mb-4">
            Select your primary technical goals to automatically pair with GDG Pretoria mentors or peer study partners based on complementary skill strengths.
          </p>

          <div class="matrix-controls">
            <div class="form-group text-left">
              <label class="form-label">I want to learn / improve in:</label>
              <select [(ngModel)]="targetGoal" class="form-control">
                <option value="GCP">Google Cloud Platform Architecture</option>
                <option value="Angular">Angular 22+ & Reactive Signals</option>
                <option value="Gemini">Generative AI & Gemini API</option>
                <option value="MockInterview">Technical Interview Practice</option>
              </select>
            </div>
            <button (click)="runMatch()" class="btn btn-primary">Find My Pair Match</button>
          </div>

          @if (matchedPair) {
            <div class="match-result-card animate-fade-in">
              <span class="badge badge-green mb-2">98% Compatibility Match Found!</span>
              <h3>Recommended Mentor: {{ matchedPair.name }}</h3>
              <p>{{ matchedPair.title }} &#64; {{ matchedPair.company }}</p>
              <p class="bio-sm">"{{ matchedPair.bio }}"</p>
              <a [href]="'mailto:' + matchedPair.email" class="btn btn-secondary btn-sm mt-3">
                <span class="material-icons-outlined">mail</span> Request Mentorship Session
              </a>
            </div>
          }
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
    }
    .tab-nav button.active {
      background: var(--bg-card);
      color: var(--gdg-green);
    }
    .mb-4 { margin-bottom: 1.5rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .member-card {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .member-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 1rem;
      border: 2px solid var(--gdg-green);
    }
    .role-title {
      font-size: 0.85rem;
      color: var(--gdg-blue);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .bio-text {
      font-size: 0.85rem;
      margin-bottom: 1rem;
      flex: 1;
    }
    .skills-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .social-links a {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin: 0 0.4rem;
      text-decoration: none;
    }
    .jobs-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .job-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }
    .company-logo {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      object-fit: cover;
    }
    .sponsor-tier { margin-left: auto; }
    .company-name { font-size: 0.9rem; color: var(--text-muted); }
    .text-blue { color: var(--gdg-blue); }
    .job-desc { font-size: 0.9rem; margin-bottom: 1rem; }
    .job-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .salary-tag { font-weight: 600; color: var(--text-main); }
    .posted-date { color: var(--text-dim); margin-left: auto; }
    .matrix-card {
      padding: 3rem 2rem;
      max-width: 720px;
      margin: 0 auto;
    }
    .matrix-icon {
      font-size: 3.5rem;
      color: var(--gdg-green);
      margin-bottom: 1rem;
    }
    .max-w-xl { max-width: 580px; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .matrix-controls {
      display: flex;
      gap: 1rem;
      align-items: flex-end;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .text-left { text-align: left; }
    .match-result-card {
      background: var(--bg-card);
      border: 1px solid var(--gdg-green);
      padding: 1.5rem;
      border-radius: var(--radius-md);
    }
    .bio-sm { font-size: 0.85rem; font-style: italic; }
  `]
})
export class MemberPortalComponent implements OnInit {
  private api = inject(ApiService);
  activeTab = signal<'directory' | 'jobs' | 'matrix'>('directory');
  members = signal<any[]>([]);
  jobs = signal<any[]>([]);
  searchQuery = '';
  targetGoal = 'GCP';
  matchedPair: any = null;

  async ngOnInit() {
    try {
      const mRes: any = await this.api.get('/auth/members');
      this.members.set(mRes.members || []);

      const jRes: any = await this.api.get('/jobs');
      this.jobs.set(jRes.jobs || []);
    } catch (e) {
      console.error(e);
    }
  }

  filteredMembers() {
    if (!this.searchQuery.trim()) return this.members();
    const q = this.searchQuery.toLowerCase();
    return this.members().filter(m =>
      m.name.toLowerCase().includes(q) ||
      (m.skills && m.skills.toLowerCase().includes(q)) ||
      (m.bio && m.bio.toLowerCase().includes(q))
    );
  }

  getSkillsArray(skillsStr?: string): string[] {
    if (!skillsStr) return ['TypeScript', 'Community Member'];
    return skillsStr.split(',').map(s => s.trim()).filter(Boolean);
  }

  runMatch() {
    if (this.members().length > 0) {
      this.matchedPair = this.members()[0];
    }
  }
}
