import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/home/home.component.js';
import { SponsorsComponent } from '../../components/sponsors/sponsors.component.js';
import { UpcomingEventsComponent } from '../../components/upcoming-events/upcoming-events.component.js';
import { CommunitySpotlightComponent } from '../../components/community-spotlight/community-spotlight.component.js';
import { DeveloperResourcesComponent } from '../../components/developer-resources/developer-resources.component.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    SponsorsComponent,
    UpcomingEventsComponent,
    CommunitySpotlightComponent,
    DeveloperResourcesComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-sponsors></app-sponsors>
    <app-upcoming-events></app-upcoming-events>
    <app-community-spotlight></app-community-spotlight>
    <app-developer-resources></app-developer-resources>
  `,
  styles: [`
    :host {
      display: block;
      background: #ffffff;
    }
  `]
})
export class HomeComponent {}
