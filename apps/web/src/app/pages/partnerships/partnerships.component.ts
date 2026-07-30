import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service.js';

@Component({
  selector: 'app-partnerships',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-yellow">Ecosystem Collaboration</span>
        <h1 class="gradient-text">Partnerships, Sponsorships & Community Needs</h1>
        <p>Support the tech ecosystem in Pretoria, gain direct access to top engineering talent, and sponsor community events.</p>
      </div>

      <!-- SPONSOR TIERS -->
      <section class="mb-5">
        <h2 class="text-center mb-4">Sponsorship Tiers & Benefits</h2>

        <div class="tiers-grid">
          <div class="gdg-card tier-card">
            <span class="badge badge-blue">Platinum Partner</span>
            <h3 class="tier-price">R50,000 / year</h3>
            <ul class="benefit-list">
              <li><span class="material-icons-outlined text-green">check</span> Keynote speaking slot at DevFest & TechFest</li>
              <li><span class="material-icons-outlined text-green">check</span> Unlimited Job Board postings on GDG Portal</li>
              <li><span class="material-icons-outlined text-green">check</span> Direct access to GDG Talent Matching Matrix</li>
              <li><span class="material-icons-outlined text-green">check</span> Premium logo placement on all event ribbons</li>
            </ul>
            <a href="mailto:sponsors@gdgpretoria.org" class="btn btn-primary btn-block mt-4">Become Platinum Sponsor</a>
          </div>

          <div class="gdg-card tier-card highlight-tier">
            <span class="badge badge-yellow">Gold Partner</span>
            <h3 class="tier-price">R25,000 / year</h3>
            <ul class="benefit-list">
              <li><span class="material-icons-outlined text-green">check</span> 5 Job Board postings per year</li>
              <li><span class="material-icons-outlined text-green">check</span> Dedicated booth space at meetups</li>
              <li><span class="material-icons-outlined text-green">check</span> Social media & newsletter spotlights</li>
            </ul>
            <a href="mailto:sponsors@gdgpretoria.org" class="btn btn-primary btn-block mt-4">Become Gold Sponsor</a>
          </div>

          <div class="gdg-card tier-card">
            <span class="badge badge-green">Venue & Community Partner</span>
            <h3 class="tier-price">In-Kind Host</h3>
            <ul class="benefit-list">
              <li><span class="material-icons-outlined text-green">check</span> Host meetups at your Pretoria offices</li>
              <li><span class="material-icons-outlined text-green">check</span> Sponsor catering, coffee, or swag</li>
              <li><span class="material-icons-outlined text-green">check</span> Brand exposure to local developers</li>
            </ul>
            <a href="mailto:sponsors@gdgpretoria.org" class="btn btn-secondary btn-block mt-4">Offer Venue / Support</a>
          </div>
        </div>
      </section>

      <!-- COMMUNITY NEEDS TRANSPARENCY BOARD -->
      <section class="mb-5">
        <div class="section-header">
          <div>
            <h2>Community Needs Board (Live Transparency Matrix)</h2>
            <p>Direct list of operational resources GDG Pretoria requires for upcoming events</p>
          </div>
        </div>

        <div class="needs-grid">
          @for (need of needs(); track need.id) {
            <div class="gdg-card need-card">
              <div class="need-header">
                <span class="badge badge-red">{{ need.urgency }} Urgency</span>
                <span class="badge badge-blue">{{ need.category }}</span>
              </div>
              <h3>{{ need.title }}</h3>
              <p>{{ need.description }}</p>
              <div class="need-footer">
                <a [href]="'mailto:' + need.contactEmail + '?subject=Inquiry: ' + need.title" class="btn btn-outline-blue btn-sm">
                  Fulfill / Assist Need &rarr;
                </a>
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
    .text-center { text-align: center; }
    .mb-5 { margin-bottom: 3.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mt-4 { margin-top: 1.25rem; }
    .btn-block { width: 100%; justify-content: center; }
    .text-green { color: var(--gdg-green); }

    .tiers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .tier-card {
      display: flex;
      flex-direction: column;
    }
    .highlight-tier {
      border: 2px solid var(--gdg-yellow);
      box-shadow: 0 0 24px var(--gdg-yellow-glow);
    }
    .tier-price {
      font-size: 1.75rem;
      margin: 1rem 0;
      color: var(--text-main);
    }
    .benefit-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--text-muted);
      flex: 1;
    }
    .benefit-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .needs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .need-header {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .need-footer {
      margin-top: 1rem;
    }
  `]
})
export class PartnershipsComponent implements OnInit {
  private api = inject(ApiService);
  needs = signal<any[]>([]);

  async ngOnInit() {
    try {
      const res: any = await this.api.get('/community/needs');
      this.needs.set(res.needs || []);
    } catch (e) {
      console.error(e);
    }
  }
}
