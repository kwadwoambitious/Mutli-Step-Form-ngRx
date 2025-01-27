export interface FormState {
  currentStep: number;
  formData: {
    personalInfo: {
      name: string;
      email: string;
      phoneNumber: string;
    };
    selectedPlan: {
      planType: 'arcade' | 'advanced' | 'pro';
      billing: 'monthly' | 'yearly';
      price: number;
      isSelected?: boolean;
    };
    addOns: {
      onlineService: boolean;
      largerStorage: boolean;
      customProfile: boolean;
    };
  };
  isSubmitting: boolean;
  error: string | null;
  tempSelectedPlan: {
    planType: 'arcade' | 'advanced' | 'pro';
    billing: 'monthly' | 'yearly';
    price: number;
  } | null;
}
