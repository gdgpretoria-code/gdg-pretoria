import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-brand">
          <div class="brand-title">
            <span class="gdg-text">GDG</span> Pretoria
          </div>
          <p class="brand-tagline">
            Building the next generation of technologists, AI researchers, and cloud engineers in Gauteng, South Africa.
          </p>
          <div class="community-badges">
            <span class="badge badge-blue">Google Developer Groups</span>
            <span class="badge badge-green">Pretoria, ZA</span>
          </div>
        </div>

        <div class="footer-column">
          <h4>Explore</h4>
          <a routerLink="/events">Upcoming Meetups</a>
          <a routerLink="/speaker-portal">Submit Talk (CFP)</a>
          <a routerLink="/mock-interview">Mock Interviews</a>
          <a routerLink="/member-portal">Job Board</a>
        </div>

        <div class="footer-column">
          <h4>Ecosystem</h4>
          <a routerLink="/partnerships">Become a Sponsor</a>
          <a routerLink="/partnerships">Community Needs</a>
          <a routerLink="/resources">Google Codelabs</a>
          <a routerLink="/resources">Code of Conduct</a>
        </div>

        <div class="footer-column">
          <h4>Connect</h4>
          <a href="https://gdg.community.dev/gdg-pretoria/" target="_blank">Bevy Platform ↗</a>
          <a href="https://chat.whatsapp.com" target="_blank">WhatsApp Group ↗</a>
          <a href="https://twitter.com" target="_blank">X / Twitter ↗</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn ↗</a>
        </div>
      </div>

      <div class="footer-bottom container">
        <p>&copy; 2026 GDG Pretoria Community. Independent developer ecosystem powered by Google technologies.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-card);
      border-top: 1px solid var(--border-color);
      padding: 4rem 0 2rem 0;
      margin-top: 5rem;
    }
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
    }
    .brand-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .gdg-text { color: var(--gdg-blue); }
    .brand-tagline {
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
      max-width: 320px;
    }
    .footer-column h4 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: var(--text-main);
    }
    .footer-column a {
      display: block;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      margin-bottom: 0.6rem;
      transition: color 0.2s ease;
    }
    .footer-column a:hover {
      color: var(--gdg-blue);
    }
    .footer-bottom {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
      font-size: 0.85rem;
      text-align: center;
    }
    @media (max-width: 768px) {
      .footer-content { grid-template-columns: 1fr; gap: 2rem; }
    }
  `]
})
export class FooterComponent {}
