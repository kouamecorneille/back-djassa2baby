export interface Coupon {
  id: string;
  coupon_code: string;
  reduction: string;
  start_date: string;  // Format: YYYY-MM-DD
  end_date: string;    // Format: YYYY-MM-DD
  is_active: boolean;
  shop: string;        // UUID
}
