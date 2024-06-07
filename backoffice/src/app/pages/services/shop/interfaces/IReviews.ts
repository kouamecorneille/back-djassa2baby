import { User } from "../../../interfaces/Iuser";

export interface ProductReview {
    id: string;
    comment: string;
    rating: number;
    user: User;
    product: string;
    added_at:number
  }
