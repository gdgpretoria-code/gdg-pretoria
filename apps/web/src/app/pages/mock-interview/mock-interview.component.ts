import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, AuthService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-green">Technical Career Preparation</span>
        <h1 class="gradient-text">Interactive Mock Interview Engine</h1>
        <p>Practice timed technical prompts for Google Cloud Platform, Angular 22+, System Design, and Node.js backend roles with automated scoring.</p>
      </div>

      <!-- TRACK FILTER & SELECTION -->
      <div class="track-filters">
        <button [class.active]="selectedTrack() === 'All'" (click)="selectTrack('All')">All Tracks</button>
        <button [class.active]="selectedTrack() === 'Cloud/GCP'" (click)="selectTrack('Cloud/GCP')">Cloud / GCP</button>
        <button [class.active]="selectedTrack() === 'Frontend'" (click)="selectTrack('Frontend')">Frontend (Angular)</button>
        <button [class.active]="selectedTrack() === 'Backend'" (click)="selectTrack('Backend')">Backend (Node/Express)</button>
        <button [class.active]="selectedTrack() === 'System Design'" (click)="selectTrack('System Design')">System Design</button>
      </div>

      <!-- INTERVIEW WORKSPACE -->
      @if (activePrompt()) {
        <div class="gdg-card glass-panel workspace-card mb-5">
          <div class="workspace-header">
            <div>
              <span class="badge badge-blue mb-1">{{ activePrompt().categoryTrack }}</span>
              <span class="badge badge-yellow ml-2">{{ activePrompt().difficulty }} Difficulty</span>
              <h2>{{ activePrompt().title }}</h2>
            </div>
            <div class="timer-badge">
              <span class="material-icons-outlined">timer</span> Time Limit: {{ activePrompt().timeLimitMinutes }} mins
            </div>
          </div>

          <div class="prompt-box mb-4">
            <h4>Technical Scenario / Prompt:</h4>
            <p>{{ activePrompt().promptText }}</p>
          </div>

          <div class="editor-wrap mb-4">
            <label class="form-label">Write your code / architectural solution below:</label>
            <textarea [(ngModel)]="userCode" class="code-editor" placeholder="// Type your TypeScript / SQL / System Design architecture response here..."></textarea>
          </div>

          <div class="workspace-actions">
            <button (click)="submitAnswer()" [disabled]="evaluating()" class="btn btn-primary">
              <span class="material-icons-outlined">fact_check</span> {{ evaluating() ? 'Evaluating Solution...' : 'Submit & Score Answer' }}
            </button>
            <button (click)="activePrompt.set(null)" class="btn btn-secondary">Choose Different Question</button>
          </div>

          <!-- EVALUATION RESULT -->
          @if (evaluationResult()) {
            <div class="result-box mt-4 animate-fade-in">
              <div class="result-header">
                <h3>Evaluation Score: <span class="score-number">{{ evaluationResult().score }}/100</span></h3>
                <span class="badge badge-green">Completed</span>
              </div>
              <p class="feedback-text"><strong>Feedback Analysis:</strong> {{ evaluationResult().feedback }}</p>

              <div class="sample-answer-box mt-3">
                <button (click)="showSample.set(!showSample())" class="btn btn-secondary btn-sm">
                  {{ showSample() ? 'Hide Sample Solution' : 'View Ideal Reference Solution' }}
                </button>
                @if (showSample()) {
                  <pre class="sample-code mt-2"><code>{{ sampleAnswer() }}</code></pre>
                }
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- QUESTION SELECTION CARDS -->
        <div class="questions-grid mb-5">
          @for (q of questions(); track q.id) {
            <div class="gdg-card question-card">
              <div class="q-header">
                <span class="badge badge-blue">{{ q.categoryTrack }}</span>
                <span class="badge badge-yellow">{{ q.difficulty }}</span>
              </div>
              <h3>{{ q.title }}</h3>
              <p>{{ q.promptText.substring(0, 110) }}...</p>
              <button (click)="startInterview(q)" class="btn btn-primary btn-sm mt-3">
                <span class="material-icons-outlined">play_arrow</span> Start Practice Session
              </button>
            </div>
          }
        </div>
      }

      <!-- PEER INTERVIEW BOOKING SECTION -->
      <section class="peer-booking-section gdg-card">
        <div class="booking-flex">
          <div>
            <h3>🤝 Schedule 1-on-1 Live Peer Practice</h3>
            <p>Connect with a GDG Pretoria mentor or peer for a 45-minute simulated live technical interview via Google Meet.</p>
          </div>
          <button (click)="bookPeerSession()" class="btn btn-secondary">Book Live Session</button>
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
    .track-filters {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
    }
    .track-filters button {
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      padding: 0.5rem 1.25rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      cursor: pointer;
    }
    .track-filters button.active {
      background: var(--gdg-green);
      color: white;
      border-color: var(--gdg-green);
    }
    .mb-5 { margin-bottom: 3rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .ml-2 { margin-left: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1.5rem; }
    .mt-2 { margin-top: 0.5rem; }

    .workspace-card { padding: 2rem; }
    .workspace-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1rem;
    }
    .timer-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--gdg-yellow);
      font-weight: 600;
    }
    .prompt-box {
      background: var(--bg-input);
      padding: 1.25rem;
      border-radius: var(--radius-sm);
      border-left: 4px solid var(--gdg-blue);
    }
    .code-editor {
      width: 100%;
      min-height: 220px;
      background: #090D16;
      color: #A7F3D0;
      font-family: var(--font-code);
      padding: 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      font-size: 0.95rem;
      resize: vertical;
    }
    .workspace-actions {
      display: flex;
      gap: 1rem;
    }
    .result-box {
      background: rgba(52, 168, 83, 0.1);
      border: 1px solid var(--gdg-green);
      padding: 1.5rem;
      border-radius: var(--radius-md);
    }
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .score-number { color: var(--gdg-green); font-size: 1.5rem; font-weight: 800; }
    .sample-code {
      background: #000;
      padding: 1rem;
      border-radius: var(--radius-sm);
      color: #7DD3FC;
      font-family: var(--font-code);
      font-size: 0.85rem;
      white-space: pre-wrap;
    }

    .questions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .question-card {
      display: flex;
      flex-direction: column;
    }
    .q-header {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .booking-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class MockInterviewComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);

  questions = signal<any[]>([]);
  selectedTrack = signal<string>('All');
  activePrompt = signal<any>(null);
  userCode = '';
  evaluating = signal<boolean>(false);
  evaluationResult = signal<any>(null);
  sampleAnswer = signal<string>('');
  showSample = signal<boolean>(false);

  async ngOnInit() {
    this.loadQuestions();
  }

  async selectTrack(track: string) {
    this.selectedTrack.set(track);
    this.loadQuestions();
  }

  async loadQuestions() {
    try {
      const endpoint = this.selectedTrack() === 'All' ? '/interview/questions' : `/interview/questions?track=${encodeURIComponent(this.selectedTrack())}`;
      const res: any = await this.api.get(endpoint);
      this.questions.set(res.questions || []);
    } catch (e) {
      console.error(e);
    }
  }

  startInterview(q: any) {
    this.activePrompt.set(q);
    this.userCode = '';
    this.evaluationResult.set(null);
    this.showSample.set(false);
  }

  async submitAnswer() {
    if (!this.userCode.trim()) {
      alert('Please enter your solution before submitting');
      return;
    }

    this.evaluating.set(true);
    try {
      const user = this.auth.currentUser();
      const res: any = await this.api.post('/interview/evaluate', {
        mockInterviewId: this.activePrompt().id,
        userCode: this.userCode,
        userId: user?.id || 'usr-anonymous',
        userName: user?.name || 'GDG Member'
      });

      this.evaluationResult.set(res.evaluation);
      this.sampleAnswer.set(res.sampleAnswer);
    } catch (err: any) {
      alert(err.message || 'Evaluation failed');
    } finally {
      this.evaluating.set(false);
    }
  }

  bookPeerSession() {
    alert('📅 Booking Calendar: Available slot selected! A Google Meet invite has been generated for your peer mock interview.');
  }
}
