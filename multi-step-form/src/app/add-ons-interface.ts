export interface AddOns {
  name: string;
  benefit: string;
  pricing: Pricing;
  selected: boolean;
}

export interface Pricing {
  monthly: number;
  yearly: number;
}
