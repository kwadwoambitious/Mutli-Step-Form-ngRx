export interface Plans {
  name: string;
  image: string;
  price: Price;
}

export interface Price {
  monthly: number;
  yearly: YearlyPrice;
}

export interface YearlyPrice {
  yearlyPrice: number;
  duration: string;
}
