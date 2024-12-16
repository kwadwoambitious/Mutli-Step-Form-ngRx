import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-starter-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './starter-page.component.html',
  styleUrls: ['./starter-page.component.css'],
})
export class StarterPageComponent {}
