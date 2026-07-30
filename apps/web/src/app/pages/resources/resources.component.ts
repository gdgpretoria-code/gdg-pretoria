import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container section-padding">
      <div class="header-center">
        <span class="badge badge-blue">Learning & Documentation</span>
        <h1 class="gradient-text">Google Codelabs & Workshop Repositories</h1>
        <p>Access step-by-step developer tutorials, slide decks, GitHub repositories, and community safety guidelines.</p>
      </div>

      <!-- CODELABS PATHWAYS -->
      <section class="mb-5">
        <h2 class="mb-4">Curated Google Codelab Pathways</h2>
        <div class="resources-grid">
          <div class="gdg-card resource-card">
            <span class="badge badge-blue mb-2">Cloud & AI</span>
            <h3>Gemini API & Vertex AI Multimodal Prompting</h3>
            <p>Learn how to use Gemini 1.5 Pro with Google Cloud Vertex AI SDK in TypeScript and Python.</p>
            <a href="https://codelabs.developers.google.com" target="_blank" class="btn btn-outline-blue btn-sm mt-3">Open Google Codelab ↗</a>
          </div>

          <div class="gdg-card resource-card">
            <span class="badge badge-yellow mb-2">Frontend</span>
            <h3>Build High Performance Apps with Angular 22 Signals</h3>
            <p>Hands-on tutorial building zero-zone reactive applications with signal stores and control flow.</p>
            <a href="https://codelabs.developers.google.com" target="_blank" class="btn btn-outline-blue btn-sm mt-3">Open Google Codelab ↗</a>
          </div>

          <div class="gdg-card resource-card">
            <span class="badge badge-green mb-2">Android</span>
            <h3>Jetpack Compose Architecture & State in 2026</h3>
            <p>Modern Android app development using Jetpack Compose, Kotlin Coroutines, and Room.</p>
            <a href="https://codelabs.developers.google.com" target="_blank" class="btn btn-outline-blue btn-sm mt-3">Open Google Codelab ↗</a>
          </div>
        </div>
      </section>

      <!-- CODE OF CONDUCT -->
      <section class="gdg-card glass-panel coc-box">
        <h2>GDG Pretoria Code of Conduct</h2>
        <p class="mb-3">
          Google Developer Group Pretoria is dedicated to providing a harassment-free community experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, race, or religion.
        </p>
        <ul class="coc-list">
          <li><strong>Be respectful:</strong> Value diverse perspectives and treat everyone with courtesy.</li>
          <li><strong>Collaborate openly:</strong> Share knowledge, support beginner developers, and foster growth.</li>
          <li><strong>Report issues:</strong> If you experience harassment, contact organizers immediately at <code>safety&#64;gdgpretoria.org</code>.</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .header-center {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 3rem auto;
    }
    .mb-5 { margin-bottom: 3.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mb-3 { margin-bottom: 1rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .coc-box { padding: 2.5rem; }
    .coc-list {
      padding-left: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.95rem;
    }
  `]
})
export class ResourcesComponent {}
