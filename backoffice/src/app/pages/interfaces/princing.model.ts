export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string | number;
  description: string;
  is_active: boolean;
}
