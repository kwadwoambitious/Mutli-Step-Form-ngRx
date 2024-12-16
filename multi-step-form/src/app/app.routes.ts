import { Routes } from '@angular/router';
import { StarterPageComponent } from './starter-page/starter-page.component';
import { SelectPlanComponent } from './select-plan/select-plan.component';
import { AddOnsComponent } from './add-ons/add-ons.component';
import { SummaryComponent } from './summary/summary.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

export const routes: Routes = [
  { path: '', component: StarterPageComponent },
  { path: 'your-info', component: PersonalDetailsComponent },
  { path: 'select-plan', component: SelectPlanComponent },
  { path: 'add-ons', component: AddOnsComponent },
  { path: 'summary', component: SummaryComponent },
];
