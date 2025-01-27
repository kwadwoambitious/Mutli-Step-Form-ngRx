import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddOnsService } from '../add-ons.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddOns } from '../add-ons-interface';
import { Store } from '@ngrx/store';
import * as FormActions from '../store/actions/form.actions';
import * as FormSelectors from '../store/selectors/form.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.css'],
})
export class AddOnsComponent implements OnInit, OnDestroy {
  public isToggled = true;
  public addOnsContainer: AddOns[] = [];
  public selectedAddOns: AddOns[] = [];
  private destroy$ = new Subject<void>();

  constructor(private addOnsService: AddOnsService, private store: Store) {}

  ngOnInit(): void {
    this.initSelectedAddOns();

    this.store
      .select(FormSelectors.selectSelectedPlan)
      .pipe(takeUntil(this.destroy$))
      .subscribe((plan) => {
        if (plan) {
          this.isToggled = plan.billing === 'yearly';
        }
      });
  }

  private initSelectedAddOns(): void {
    this.addOnsService
      .getAddOnsData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.addOnsContainer = data;

        this.store
          .select(FormSelectors.selectAddOns)
          .pipe(takeUntil(this.destroy$))
          .subscribe((storeAddOns) => {
            this.addOnsContainer = this.addOnsContainer.map((addon) => ({
              ...addon,
              selected:
                addon.name === 'Online Service'
                  ? storeAddOns.onlineService
                  : addon.name === 'Larger Storage'
                  ? storeAddOns.largerStorage
                  : addon.name === 'Customizable Profile'
                  ? storeAddOns.customProfile
                  : false,
            }));
          });
      });
  }

  public getChecked(addOn: AddOns): void {
    addOn.selected = !addOn.selected;

    const updatedAddOns = {
      onlineService:
        this.addOnsContainer.find((a) => a.name === 'Online Service')
          ?.selected || false,
      largerStorage:
        this.addOnsContainer.find((a) => a.name === 'Larger Storage')
          ?.selected || false,
      customProfile:
        this.addOnsContainer.find((a) => a.name === 'Customizable Profile')
          ?.selected || false,
    };

    this.store.dispatch(FormActions.updateAddOns(updatedAddOns));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
