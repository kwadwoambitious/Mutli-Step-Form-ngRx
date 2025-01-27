export interface Plans {
  type: 'arcade' | 'advanced' | 'pro';
  name: string;
  image: string;
  price: {
    monthly: number;
    yearly: {
      yearlyPrice: number;
      duration: string;
    };
  };
}
