import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';
import { EventsComponent } from './pages/events/events.component.js';
import { SpeakerPortalComponent } from './pages/speaker-portal/speaker-portal.component.js';
import { MemberPortalComponent } from './pages/member-portal/member-portal.component.js';
import { MockInterviewComponent } from './pages/mock-interview/mock-interview.component.js';
import { PartnershipsComponent } from './pages/partnerships/partnerships.component.js';
import { ResourcesComponent } from './pages/resources/resources.component.js';
import { AdminComponent } from './pages/admin/admin.component.js';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'GDG Pretoria - Welcome Hub' },
  { path: 'events', component: EventsComponent, title: 'Events & Media Gallery - GDG Pretoria' },
  { path: 'speaker-portal', component: SpeakerPortalComponent, title: 'Speaker CFP Portal - GDG Pretoria' },
  { path: 'member-portal', component: MemberPortalComponent, title: 'Ecosystem Directory & Job Board - GDG Pretoria' },
  { path: 'mock-interview', component: MockInterviewComponent, title: 'Interactive Mock Interviews - GDG Pretoria' },
  { path: 'partnerships', component: PartnershipsComponent, title: 'Partnerships & Community Needs - GDG Pretoria' },
  { path: 'resources', component: ResourcesComponent, title: 'Google Codelabs & Resources - GDG Pretoria' },
  { path: 'admin', component: AdminComponent, title: 'Organizer Admin Panel - GDG Pretoria' },
  { path: '**', redirectTo: '' }
];
