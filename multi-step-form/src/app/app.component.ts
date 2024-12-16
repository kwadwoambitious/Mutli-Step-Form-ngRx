import { Component, OnInit } from '@angular/core';
import { StarterPageComponent } from './starter-page/starter-page.component';
import { ResetFormService } from './reset-form.service';
import { Router } from '@angular/router';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, StarterPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showStarterPage = true;

  constructor(
    private router: Router,
    private resetFormService: ResetFormService
  ) {}

  ngOnInit(): void {
    this.checkRouteAndUpdatePageVisibility();

    this.router.events.subscribe(() => {
      this.checkRouteAndUpdatePageVisibility();
    });
  }

  private checkRouteAndUpdatePageVisibility(): void {
    this.showStarterPage = this.router.url === '' || this.router.url === '/';
  }

  public resetForm(): void {
    this.resetFormService.resetForm();
    this.showStarterPage = true;
    this.router.navigate(['/']);
  }
}
