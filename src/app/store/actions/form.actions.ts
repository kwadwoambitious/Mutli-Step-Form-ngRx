import { createAction, props } from '@ngrx/store';

export const nextStep = createAction('[Form] Next Step');
export const previousStep = createAction('[Form] Previous Step');
export const goToStep = createAction(
  '[Form] Go To Step',
  props<{ step: number }>()
);

export const updatePersonalInfo = createAction(
  '[Form] Update Personal Info',
  props<{
    name: string;
    email: string;
    phoneNumber: string;
  }>()
);

export const updateSelectedPlan = createAction(
  '[Form] Update Selected Plan',
  props<{
    planType: 'arcade' | 'advanced' | 'pro';
    billing: 'monthly' | 'yearly';
    price: number;
    isSelected: boolean;
  }>()
);

export const updateAddOns = createAction(
  '[Form] Update Add-ons',
  props<{
    onlineService: boolean;
    largerStorage: boolean;
    customProfile: boolean;
  }>()
);

export const submitForm = createAction('[Form] Submit Form');
export const submitFormSuccess = createAction('[Form] Submit Form Success');
export const submitFormFailure = createAction(
  '[Form] Submit Form Failure',
  props<{ error: string }>()
);

export const resetForm = createAction('[Form] Reset Form');

export const saveTempPlan = createAction(
  '[Form] Save Temporary Plan',
  props<{
    planType: 'arcade' | 'advanced' | 'pro';
    billing: 'monthly' | 'yearly';
    price: number;
  }>()
);
