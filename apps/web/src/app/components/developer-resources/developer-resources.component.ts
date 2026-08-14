import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-developer-resources',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './developer-resources.component.html',
  styleUrl: './developer-resources.component.css'
})
export class DeveloperResourcesComponent {}
