import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as FormSelectors from '../store/selectors/form.selectors';
import * as FormActions from '../store/actions/form.actions';
import { switchMap, combineLatestWith, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AddOns } from '../add-ons-interface';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, TitleCasePipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  public confirmed = false;
  public message =
    'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.';
  public selectedPlan$;
  public selectedAddOns$;
  public totalPrice$;
  public canSubmit = false;
  public addOnsContainer: AddOns[] = [];
  public isYearly = false;
  public addOnsData = [
    {
      name: 'Online service',
      pricing: { monthly: 1, yearly: 10 },
    },
    {
      name: 'Larger storage',
      pricing: { monthly: 2, yearly: 20 },
    },
    {
      name: 'Customizable profile',
      pricing: { monthly: 2, yearly: 20 },
    },
  ];
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.selectedPlan$ = this.store.select(FormSelectors.selectTempPlan).pipe(
      takeUntil(this.destroy$),
      switchMap((tempPlan) =>
        tempPlan
          ? of(tempPlan)
          : this.store
              .select(FormSelectors.selectSelectedPlan)
              .pipe(takeUntil(this.destroy$))
      )
    );

    this.selectedAddOns$ = this.store
      .select(FormSelectors.selectAddOns)
      .pipe(takeUntil(this.destroy$));

    this.totalPrice$ = this.store
      .select(FormSelectors.selectTotalPrice)
      .pipe(takeUntil(this.destroy$));

    this.selectedPlan$.pipe(takeUntil(this.destroy$)).subscribe((plan) => {
      this.isYearly = plan?.billing === 'yearly';
    });
  }

  ngOnInit(): void {
    this.store
      .select(FormSelectors.selectPersonalInfo)
      .pipe(
        takeUntil(this.destroy$),
        combineLatestWith(
          this.store
            .select(FormSelectors.selectSelectedPlan)
            .pipe(takeUntil(this.destroy$))
        )
      )
      .subscribe(([personalInfo, selectedPlan]) => {
        this.canSubmit = !!(
          personalInfo.name &&
          personalInfo.email &&
          personalInfo.phoneNumber &&
          selectedPlan
        );
      });
  }

  public isConfirmed(): void {
    if (!this.canSubmit) {
      alert('Please complete your personal information');
      return;
    }

    this.confirmed = true;
    this.store.dispatch(FormActions.submitForm());
    this.store.dispatch(FormActions.submitFormSuccess());
    this.store.dispatch(FormActions.resetForm());
  }

  public getAddOnStatus(addOns: any, name: string): boolean {
    const key = name.toLowerCase().replace(' ', '') as
      | 'onlineService'
      | 'largerStorage'
      | 'customProfile';
    return addOns[key];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
