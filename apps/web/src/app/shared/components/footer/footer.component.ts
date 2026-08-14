import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="assets/logos/gdg-pretoria-lockup.png" alt="GDG Pretoria" class="footer-logo" />
          <p>
            Building the next generation of technologists, AI researchers, and
            cloud engineers in Pretoria, South Africa.
          </p>
          <div class="socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.725-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.83c0-1.87-.03-4.27-2.6-4.27-2.6 0-3 2.03-3 4.13V24H8.34z"/></svg>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.5 3.7 12 3.7 12 3.7s-7.5 0-9.37.36A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14C4.5 20.3 12 20.3 12 20.3s7.5 0 9.37-.36a3.02 3.02 0 0 0 2.13-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.57V8.43L15.84 12z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Navigation</h4>
          <a routerLink="/events">Events</a>
          <a routerLink="/speaker-portal">Speakers</a>
          <a routerLink="/partnerships">Sponsors</a>
          <a routerLink="/resources">Resources</a>
        </div>

        <div class="footer-col">
          <h4>Support</h4>
          <a routerLink="/member-portal">Contact us</a>
          <a routerLink="/resources">FAQ</a>
          <a routerLink="/resources">Code of Conduct</a>
        </div>

        <div class="footer-col">
          <h4>Keep in Touch</h4>
          <p class="newsletter-copy">Get meetup reminders and community news.</p>
          <form class="newsletter" (submit)="join($event)">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              [value]="email()"
              (input)="email.set($any($event.target).value)"
              aria-label="Email address"
            />
            <button type="submit">Join</button>
          </form>
          @if (joined()) {
            <p class="newsletter-ok">Thanks — you’re on the list.</p>
          }
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 GDG Pretoria. Independent Google Developer Group community.</p>
      </div>

      <a
        class="fab"
        href="https://chat.whatsapp.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join WhatsApp community"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </a>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      background: #eef1f5;
      color: #3c4043;
      padding: 3rem 1.25rem 1.5rem;
    }
    .footer-inner {
      max-width: 1120px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .footer-logo {
      display: block;
      height: 32px;
      width: auto;
      margin-bottom: 0.85rem;
    }
    .footer-brand p,
    .newsletter-copy {
      margin: 0 0 1rem;
      max-width: 280px;
      color: #5f6368;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .socials {
      display: flex;
      gap: 0.55rem;
    }
    .socials a {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #e8f0fe;
      color: #1a73e8;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .socials svg {
      width: 16px;
      height: 16px;
    }
    .footer-col h4 {
      margin: 0 0 0.85rem;
      color: #202124;
      font-size: 0.95rem;
    }
    .footer-col a {
      display: block;
      color: #5f6368;
      text-decoration: none;
      font-size: 0.9rem;
      margin-bottom: 0.55rem;
    }
    .footer-col a:hover { color: #1a73e8; }
    .newsletter {
      display: flex;
      max-width: 280px;
      border: 1px solid #dadce0;
      border-radius: 999px;
      overflow: hidden;
      background: #fff;
    }
    .newsletter input {
      flex: 1;
      min-width: 0;
      border: 0;
      padding: 0.7rem 0.9rem;
      font: inherit;
      font-size: 0.88rem;
      outline: none;
      background: transparent;
      color: #202124;
    }
    .newsletter button {
      border: 0;
      background: #4285f4;
      color: #fff;
      font: inherit;
      font-weight: 700;
      padding: 0 1rem;
      cursor: pointer;
    }
    .newsletter-ok {
      margin: 0.55rem 0 0;
      color: #137333;
      font-size: 0.82rem;
    }
    .footer-bottom {
      max-width: 1120px;
      margin: 2.25rem auto 0;
      padding-top: 1.1rem;
      border-top: 1px solid #dadce0;
      font-size: 0.8rem;
      color: #80868b;
    }
    .footer-bottom p { margin: 0; color: inherit; }
    .fab {
      position: fixed;
      right: 1.1rem;
      bottom: 1.1rem;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #4285f4;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(66, 133, 244, 0.35);
      z-index: 50;
    }
    .fab svg { width: 22px; height: 22px; }
    @media (min-width: 900px) {
      .footer { padding: 4rem 1.5rem 1.75rem; }
      .footer-inner {
        grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
        gap: 2.5rem;
      }
    }
  `]
})
export class FooterComponent {
  email = signal('');
  joined = signal(false);

  join(event: Event) {
    event.preventDefault();
    if (!this.email().trim()) return;
    this.joined.set(true);
    this.email.set('');
  }
}
