import { Component, OnInit } from '@angular/core';
import { StarterPageComponent } from './starter-page/starter-page.component';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as FormActions from './store/actions/form.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, StarterPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showStarterPage = true;

  constructor(private router: Router, private store: Store) {}

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
    this.store.dispatch(FormActions.resetForm());
    this.showStarterPage = true;
    this.router.navigate(['/']);
  }
}
