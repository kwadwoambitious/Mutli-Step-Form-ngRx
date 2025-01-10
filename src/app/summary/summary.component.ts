import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Plans } from '../plan-interface';
import { AddOns } from '../add-ons-interface';
import { ResetFormService } from '../reset-form.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  public confirmed = false;
  public message =
    'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.';
  public selectedPlan: Plans | undefined = undefined;
  public selectedAddOns: AddOns[] = [];
  public isToggled = false;

  constructor(
    private router: Router,
    private resetFormService: ResetFormService
  ) {}

  ngOnInit(): void {
    const storedPlan = localStorage.getItem('selectedPlan');
    this.selectedPlan = storedPlan ? JSON.parse(storedPlan) : undefined;

    const storedValue = localStorage.getItem('selectedDuration');
    this.isToggled = storedValue ? JSON.parse(storedValue) : false;

    const storedAddOns = localStorage.getItem('addOns');
    this.selectedAddOns = storedAddOns ? JSON.parse(storedAddOns) : [];
  }

  public isConfirmed(): void {
    if (
      !localStorage.getItem('name') ||
      !localStorage.getItem('email') ||
      !localStorage.getItem('phone')
    ) {
      this.router.navigate(['/your-info']);
    } else {
      this.confirmed = true;
      this.resetFormService.resetForm();
    }
  }

  public getPlanPrice(): number {
    if (!this.selectedPlan) return 0;

    return !this.isToggled
      ? this.selectedPlan.price.monthly
      : this.selectedPlan.price.yearly.yearlyPrice;
  }

  public calculateTotal(): number {
    if (!this.selectedPlan) return 0;

    const addOnsTotal = this.selectedAddOns.reduce((total, addon) => {
      const addonPrice = !this.isToggled
        ? addon.pricing.monthly
        : addon.pricing.yearly;
      return total + addonPrice;
    }, 0);

    return this.getPlanPrice() + addOnsTotal;
  }
}
