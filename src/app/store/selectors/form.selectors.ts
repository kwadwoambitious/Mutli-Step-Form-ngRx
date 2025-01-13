import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from '../state/form.state';

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectCurrentStep = createSelector(
  selectFormState,
  (state) => state.currentStep
);

export const selectPersonalInfo = createSelector(
  selectFormState,
  (state) => state.formData.personalInfo
);

export const selectSelectedPlan = createSelector(
  selectFormState,
  (state) => state.formData.selectedPlan
);

export const selectAddOns = createSelector(
  selectFormState,
  (state) => state.formData.addOns
);

export const selectTotalPrice = createSelector(
  selectSelectedPlan,
  selectAddOns,
  (plan, addOns) => {
    let total = plan.price;
    if (addOns.onlineService) total += plan.billing === 'monthly' ? 1 : 10;
    if (addOns.largerStorage) total += plan.billing === 'monthly' ? 2 : 20;
    if (addOns.customProfile) total += plan.billing === 'monthly' ? 2 : 20;
    return total;
  }
);

export const selectTempPlan = createSelector(
  selectFormState,
  (state) => state.tempSelectedPlan
);
