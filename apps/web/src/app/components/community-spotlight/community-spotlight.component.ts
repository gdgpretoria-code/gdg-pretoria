import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community-spotlight',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './community-spotlight.component.html',
  styleUrl: './community-spotlight.component.css'
})
export class CommunitySpotlightComponent {
  readonly member = {
    name: 'Zanele Khumalo',
    role: 'Community Member',
    quote: 'GDG Pretoria helped me go from learning Angular to shipping production apps and mentoring other developers in Gauteng. The workshops, WhatsApp group, and people here make it easy to keep growing.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  };
}
