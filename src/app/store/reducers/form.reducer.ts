import { createReducer, on } from '@ngrx/store';
import { FormState } from '../state/form.state';
import * as FormActions from '../actions/form.actions';

export const initialState: FormState = {
  currentStep: 1,
  formData: {
    personalInfo: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    selectedPlan: {
      planType: 'arcade',
      billing: 'monthly',
      price: 9,
    },
    addOns: {
      onlineService: false,
      largerStorage: false,
      customProfile: false,
    },
  },
  isSubmitting: false,
  error: null,
  tempSelectedPlan: null,
};

export const formReducer = createReducer(
  initialState,

  on(FormActions.nextStep, (state) => ({
    ...state,
    currentStep: Math.min(state.currentStep + 1, 4),
  })),

  on(FormActions.previousStep, (state) => ({
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1),
  })),

  on(FormActions.goToStep, (state, { step }) => ({
    ...state,
    currentStep: step,
  })),

  on(FormActions.updatePersonalInfo, (state, personalInfo) => ({
    ...state,
    formData: {
      ...state.formData,
      personalInfo,
    },
  })),

  on(FormActions.updateSelectedPlan, (state, plan) => ({
    ...state,
    formData: {
      ...state.formData,
      selectedPlan: {
        planType: plan.planType,
        billing: plan.billing,
        price: plan.price,
      },
    },
  })),

  on(FormActions.updateAddOns, (state, addOns) => {
    return {
      ...state,
      formData: {
        ...state.formData,
        addOns: {
          onlineService: addOns.onlineService,
          largerStorage: addOns.largerStorage,
          customProfile: addOns.customProfile,
        },
      },
    };
  }),

  on(FormActions.submitForm, (state) => ({
    ...state,
    formData: {
      ...state.formData,
      selectedPlan: state.tempSelectedPlan || state.formData.selectedPlan,
    },
    tempSelectedPlan: null,
    isSubmitting: true,
    error: null,
  })),

  on(FormActions.submitFormSuccess, (state) => ({
    ...initialState,
  })),

  on(FormActions.submitFormFailure, (state, { error }) => ({
    ...state,
    isSubmitting: false,
    error,
  })),

  on(FormActions.saveTempPlan, (state, plan) => ({
    ...state,
    tempSelectedPlan: plan,
  })),

  on(FormActions.resetForm, () => ({
    ...initialState,
  }))
);
