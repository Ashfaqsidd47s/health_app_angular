import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private router = inject(Router);
  activeRoute = signal(this.router.url);

  constructor() {
    this.router.events.subscribe(() => {
      this.activeRoute.set(this.router.url);
    });
  }

  isActive(route: string): boolean {
    return this.activeRoute() === route;
  }
}
