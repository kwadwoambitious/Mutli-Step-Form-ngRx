import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectPlanService } from '../select-plan.service';
import { RouterLink } from '@angular/router';
import { Plans } from '../plan-interface';
import { Store } from '@ngrx/store';
import * as FormActions from '../store/actions/form.actions';
import * as FormSelectors from '../store/selectors/form.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css'],
})
export class SelectPlanComponent implements OnInit, OnDestroy {
  public selectPlanContainer: Plans[] = [];
  public isToggled = false;
  public selectedPlan: Plans | undefined = undefined;
  public selectedPlan$;

  private destroy$ = new Subject<void>();

  constructor(
    private selectPlanService: SelectPlanService,
    private store: Store
  ) {
    this.selectedPlan$ = this.store.select(FormSelectors.selectSelectedPlan);
  }

  ngOnInit(): void {
    this.initSelectedPlan();

    this.store
      .select(FormSelectors.selectTempPlan)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tempPlan) => {
        if (tempPlan) {
          this.selectedPlan = this.selectPlanContainer.find(
            (p) => p.type === tempPlan.planType
          );
          this.isToggled = tempPlan.billing === 'yearly';
        }
      });

    this.store
      .select(FormSelectors.selectSelectedPlan)
      .pipe(takeUntil(this.destroy$))
      .subscribe((plan) => {
        if (plan && !this.selectedPlan) {
          this.selectedPlan = this.selectPlanContainer.find(
            (p) => p.type === plan.planType
          );
          this.isToggled = plan.billing === 'yearly';
        }
      });
  }

  private initSelectedPlan(): void {
    this.selectPlanService
      .getPlansData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.selectPlanContainer = data;
      });
  }

  public selectPlan(plan: Plans): void {
    this.selectedPlan = plan;
    this.saveChanges();
  }

  public saveChanges(): void {
    if (this.selectedPlan) {
      this.store.dispatch(
        FormActions.updateSelectedPlan({
          planType: this.selectedPlan.type,
          billing: this.isToggled ? 'yearly' : 'monthly',
          price: this.isToggled
            ? this.selectedPlan.price.yearly.yearlyPrice
            : this.selectedPlan.price.monthly,
          isSelected: true,
        })
      );
    }
  }

  public isPlanSelected(plan: Plans): boolean {
    return this.selectedPlan?.type === plan.type;
  }

  public toggleDuration(): void {
    this.isToggled = !this.isToggled;
    this.saveChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
