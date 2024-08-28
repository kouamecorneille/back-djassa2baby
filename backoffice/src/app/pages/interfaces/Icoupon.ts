export interface Coupon {
  id: string;
  coupon_code: string;
  max_activation: number;
  reduction: string;
  start_date: string;  // Format: YYYY-MM-DD
  end_date: string;    // Format: YYYY-MM-DD
  is_active: boolean;
  is_publish: boolean;
  shop: string;        // UUID
}
