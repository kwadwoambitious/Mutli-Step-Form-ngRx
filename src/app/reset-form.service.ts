import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetFormService {
  constructor() {}

  public resetForm(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('selectedPlan');
    localStorage.removeItem('addOns');
  }
}
